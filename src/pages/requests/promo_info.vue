<template>
    <v-main>
        <div class="root">
            <h2>Заявки на модерацию</h2>
            <v-tabs
                background-color="transparent"
                color="#FF2D34"
                height="50"
                class="mt-5"
            >
                <v-tab> Общее </v-tab>
                <v-tab> Старая версия </v-tab>
                <v-tab> Новая версия </v-tab>
                <v-tab-item>
                    <div v-if="newItem">
                        <v-row class="pt-0">
                            <v-col md="8">
                                <div class="header-text">
                                    <h3>{{ companyName }}</h3>
                                    <span class="grey-text text">{{
                                        new Date(
                                            newItem.updated_at
                                        ).toLocaleString()
                                    }}</span>
                                    <v-badge
                                        dot
                                        :color="
                                            getColorByStatus(newItem.status)
                                        "
                                        offset-x="-20"
                                        offset-y="18.3"
                                    ></v-badge>
                                </div>
                                <span class="grey-text">{{
                                    newItem.request_comment
                                }}</span>
                            </v-col>
                            <v-col
                                v-if="newItem.status === 0"
                                class="right auto"
                            >
                                <v-btn
                                    dark
                                    color="red"
                                    class="normal-text mr-4"
                                    text
                                    @click="
                                        rejectRequest('promo_info', newItem.id)
                                    "
                                >
                                    Отклонить
                                </v-btn>
                                <v-btn
                                    text
                                    class="normal-text"
                                    color="green"
                                    @click="
                                        approveRequest('promo_info', newItem.id)
                                    "
                                    >Принять</v-btn
                                >
                            </v-col>
                        </v-row>
                        <div class="pt-5">
                            <span>Причина отклонения</span>
                            <v-textarea
                                hide-details
                                outlined
                                placeholder="Введите причину отклонения"
                                color="#999"
                                v-model="rejectComment"
                                :readonly="newItem.status !== 0"
                            ></v-textarea>
                            <v-row v-if="newItem.status !== 0">
                                <v-col
                                    md="2"
                                    sm="4"
                                    xs="6"
                                    v-for="(url, index) in rejectImages"
                                    :key="index"
                                    class="relative"
                                >
                                    <v-img
                                        style="cursor: pointer"
                                        :lazy-src="url"
                                        :src="url"
                                        @click="
                                            rejectImageGalleryIndex = index;
                                            rejectImageGalleryShow = true;
                                        "
                                        height="160"
                                    >
                                    </v-img>
                                </v-col>
                                <vue-easy-lightbox
                                    :visible="rejectImageGalleryShow"
                                    :imgs="rejectImages"
                                    @hide="rejectImageGalleryShow = false"
                                    :index="rejectImageGalleryIndex"
                                ></vue-easy-lightbox>
                            </v-row>
                            <div v-else>
                                <v-file-input
                                    chips
                                    multiple
                                    show-size=""
                                    truncate-length="14"
                                    accept="image/*"
                                    label="Прикрепить изображение"
                                    class="mt-3"
                                    v-model="rejectAttachImages"
                                ></v-file-input>
                            </div>
                        </div>
                    </div>
                </v-tab-item>
                <v-tab-item>
                    <v-row class="pt-0">
                        <v-col md="8">
                            <div class="header-text">
                                <h3>{{ companyName }}</h3>
                                <span class="grey-text text">{{
                                    new Date(
                                        newItem.updated_at
                                    ).toLocaleString()
                                }}</span>
                                <v-badge
                                    dot
                                    :color="
                                        getColorByStatus(newItem.status)
                                    "
                                    offset-x="-20"
                                    offset-y="18.3"
                                ></v-badge>
                            </div>
                            <span class="grey-text">{{
                                newItem.request_comment
                            }}</span>
                        </v-col>
                        <v-col
                            v-if="newItem.status === 0"
                            class="right auto"
                        >
                            <v-btn
                                dark
                                color="red"
                                class="normal-text mr-4"
                                text
                                @click="
                                    rejectRequest('promo_info', newItem.id)
                                "
                            >
                                Отклонить
                            </v-btn>
                            <v-btn
                                text
                                class="normal-text"
                                color="green"
                                @click="
                                    approveRequest('promo_info', newItem.id)
                                "
                                >Принять</v-btn
                            >
                        </v-col>
                    </v-row>
                    <div class="pt-5" v-if="oldItem">
                        <div
                            class="mb-4"
                            hide-details
                            outlined
                            readonly
                            color="#414042"
                            v-html="oldItem.description"
                        ></div>
                    </div>
                    <div v-else>
                        Здесь сейчас пусто.
                    </div>
                </v-tab-item>
                <v-tab-item>
                    <v-row class="pt-0">
                        <v-col md="8">
                            <div class="header-text">
                                <h3>{{ companyName }}</h3>
                                <span class="grey-text text">{{
                                    new Date(
                                        newItem.updated_at
                                    ).toLocaleString()
                                }}</span>
                                <v-badge
                                    dot
                                    :color="
                                        getColorByStatus(newItem.status)
                                    "
                                    offset-x="-20"
                                    offset-y="18.3"
                                ></v-badge>
                            </div>
                            <span class="grey-text">{{
                                newItem.request_comment
                            }}</span>
                        </v-col>
                        <v-col
                            v-if="newItem.status === 0"
                            class="right auto"
                        >
                            <v-btn
                                dark
                                color="red"
                                class="normal-text mr-4"
                                text
                                @click="
                                    rejectRequest('promo_info', newItem.id)
                                "
                            >
                                Отклонить
                            </v-btn>
                            <v-btn
                                text
                                class="normal-text"
                                color="green"
                                @click="
                                    approveRequest('promo_info', newItem.id)
                                "
                                >Принять</v-btn
                            >
                        </v-col>
                    </v-row>
                    <div class="pt-5" v-if="newItem">
                        <div
                            class="mb-4"
                            hide-details
                            outlined
                            readonly
                            color="#414042"
                            v-html="newItem.description"
                        ></div>
                    </div>
                </v-tab-item>
            </v-tabs>
        </div>
    </v-main>
</template>

<script>
import firebase from "firebase";
import VueEasyLightbox from "vue-easy-lightbox";
export default {
    components: {
        VueEasyLightbox
    },
    created() {
        this.$store
            .dispatch("getPromoInformationRequestById", this.requestId)
            .then((resp) => {
                if (resp && resp.new) {
                    this.newItem = resp.new;
                    if (this.newItem.status === 2) {
                        this.rejectComment = this.newItem.declined_reason;
                        this.rejectImages = this.newItem.declined_images;
                    }
                }
                if (resp && resp.old) {
                    this.oldItem = resp.old;
                }
                if (resp && resp.name){
                    this.companyName = resp.name
                }
            });
    },
    data() {
        return {
            requestId: this.$route.params.id,
            newItem: null,
            oldItem: null,
            companyName: null,

            rejectComment: null,
            rejectImages: null,

            rejectAttachImages: null,

            rejectImageGalleryShow: false,
            rejectImageGalleryIndex: null
        };
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
        async rejectRequest(requestCategory, id) {
            let data = { requestCategory, id };
            if (!this.rejectComment || this.rejectComment.trim() == ''){
                this.$store.commit('setAlert', {
                    show: true,
                    text: 'Введите причину отклонения!'
                })
                return
            }
            data.declined_reason = this.rejectComment;
            if (this.rejectAttachImages){
                this.$store.dispatch("setProcessing", true);
                let declined_images = []
                await Promise.all(this.rejectAttachImages.map(async image => {
                    const time = new Date().getTime();
                    const storageRef = firebase.storage().ref(`/reject_images/${time}`)
                    const uploadTask = storageRef.put(image);
                    const image_url = await new Promise((resolve, reject) => {
                        uploadTask.on('state_changed', () => {

                        }, error => reject(error),
                        async () => {
                            const downloadUrl = await uploadTask.snapshot.ref.getDownloadURL();
                            resolve(downloadUrl);
                        });
                    });
                    declined_images.push(image_url)
                }));
                this.rejectAttachImages = null
                data.declined_images = declined_images
            }
            this.$store.dispatch("rejectRequest", data).then(() => {
                this.newItem.status = 2;
                this.$router.push("/requests")
            });
        },
        approveRequest(requestCategory, id) {
            this.$store
                .dispatch("approveRequest", { requestCategory, id })
                .then(() => {
                    this.newItem.status = 1;
                    this.$router.push("/requests")
                });
        }
    },
};
</script>

<style>
</style>
