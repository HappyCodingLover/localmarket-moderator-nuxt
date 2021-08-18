<template>
    <v-main>
        <div class="root">
            <h2>Заявки на модерацию</h2>
            <div class="mt-10">
                <v-list-item
                    v-for="(item, index) in requests"
                    :key="index"
                >
                    <v-row>
                        <v-col md="7" class="pl-0 pb-0">
                            <v-row>
                                <v-col md="8" class="pt-1 pb-1">
                                    <!-- <router-link :to="item.requestCategory + '/' + item.id"> -->
                                            {{ item.title }}
                                    <!-- </router-link> -->
                                </v-col>
                                <v-col md="4" class="pt-1 pb-1">
                                    <span class="grey-text">
                                        {{ new Date(item.date).toLocaleString() }}
                                        <v-badge v-if="item.status === 0" dot color="yellow" offset-x="-20" offset-y="-1"></v-badge>
                                    </span>
                                </v-col>
                                <v-col md="12">
                                    <span class="grey-text">{{item.request_comment}}</span>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col md="2" class="auto right">
                            <v-btn
                                text
                                class="mr-4"
                                :to="'/requests/' + item.requestCategory + '/' + item.id"
                            >
                                Перейти
                            </v-btn>
                        </v-col>
                        <v-col md="3" class="right auto" v-if="item.status === 0">
                            <v-btn
                                dark
                                color="red"
                                class="normal-text mr-4"
                                text
                                @click="rejectReasonDialog = true; rejectRequestCategory = item.requestCategory; rejectId = item.id; rejectIndex = index"
                            >
                                Отклонить
                            </v-btn>
                            <v-btn
                                text
                                class="normal-text"
                                color="green"
                                @click="approveRequest(item.requestCategory, item.id, index)"
                                >Принять</v-btn
                            >
                        </v-col>
                        <v-col md="3" class="right auto" v-else>
                            <v-badge
                                dot
                                :color="getColorByStatus(item.status)"
                                left
                                offset-x="-7"
                                offset-y="-1"
                                class="mr-2"
                            ></v-badge>
                            <span>{{ getTextByStatus(item.status) }}</span>
                        </v-col>
                        <v-col md="12" class="pl-0 pr-0">
                            <v-divider></v-divider>
                        </v-col>
                    </v-row>
                </v-list-item>
                <mugen-scroll :handler="addNewRequests" :should-handle="!loadingRequests" class="center pa-3" v-if="loadingScrollShow">
                    <v-progress-circular
                        :size="50"
                        indeterminate
                    ></v-progress-circular>
                </mugen-scroll>
            </div>
            <v-dialog v-model="rejectReasonDialog" width="500">
                <v-card>
                    <v-card-title class="headline">
                        <v-icon class="mr-2">mdi-pencil</v-icon>
                        Подтверждение отклонения
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-text class="mt-2" style="padding-bottom: 4px"
                        >Введите причину отклонения</v-card-text
                    >
                    <v-textarea
                        class="ml-5 mr-5 mb-4"
                        hide-details
                        outlined
                        placeholder="Введите текст..."
                        color="#414042"
                        v-model="rejectReason"
                    ></v-textarea>
                    <v-divider></v-divider>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            outlined
                            @click="rejectReasonDialog = false"
                            color="#7d7d7d"
                            class="normal-text"
                            width="120"
                            height="40"
                        >
                            Отменить
                        </v-btn>
                        <v-btn
                            dark
                            @click="rejectRequest"
                            color="red"
                            class="normal-text"
                            width="120"
                            height="40"
                        >
                            Отклонить
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </div>
    </v-main>
</template>

<script>
import MugenScroll from 'vue-mugen-scroll'
export default {
    components: {
        MugenScroll
    },
    data() {
        return {
            requests: [],
            loadingRequests: false,
            loadingScrollShow: true,

            rejectReasonDialog: false,
            rejectReason: null,
            rejectRequestCategory : null,
            rejectId: null,
            rejectIndex: null
        };
    },
    computed: {},
    mounted() {
        this.requests = this.$store.state.requests
    },
    created() {
        this.$store.dispatch("clearRequests");
    },
    watch: {
        "$store.state.requests": function () {
            this.requests = this.$store.state.requests
        },
        "$store.state.requestComplete": function () {
            this.loadingScrollShow = !this.$store.state.requestComplete
        },
    },
    methods: {
        getColorByStatus(status) {
            switch (status) {
                case 0:
                    return "yellow";
                case 1:
                    return "green";
                case 2:
                    return "red";
            }
        },
        getTextByStatus(status) {
            switch (status) {
                case 0:
                    return "На рассмотрении";
                case 1:
                    return "Одобрено";
                case 2:
                    return "Отклонено";
            }
        },
        addNewRequests(){
            this.loadingRequests = true
            this.$store.dispatch("getRequests").then(()=>{
                this.loadingRequests = false
            });
        },
        rejectRequest(){
            this.rejectReasonDialog = false
            this.$store.dispatch("rejectRequest", {requestCategory : this.rejectRequestCategory, id : this.rejectId, declined_reason: this.rejectReason}).then(()=>{
                this.requests[this.rejectIndex].status = 2

                this.rejectRequestCategory = null
                this.rejectId = null
                this.rejectIndex = null
                this.rejectReason = null
            });
        },
        approveRequest(requestCategory, id, index){
            this.$store.dispatch("approveRequest", {requestCategory, id}).then(()=>{
                this.requests[index].status = 1
            });
        }
    },
};
</script>
