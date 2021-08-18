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
                                    <h3>{{ newItem.name }}</h3>
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
                                        rejectRequest('company', newItem.id)
                                    "
                                >
                                    Отклонить
                                </v-btn>
                                <v-btn
                                    text
                                    class="normal-text"
                                    color="green"
                                    @click="
                                        approveRequest('company', newItem.id)
                                    "
                                    >Принять</v-btn
                                >
                            </v-col>
                        </v-row>
                        <div class="pt-5">
                            <span>Комментарий к отклонению</span>
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
                    <v-row v-if="newItem" class="pt-0">
                        <v-col md="8">
                            <div class="header-text">
                                <h3>{{ newItem.name }}</h3>
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
                                    rejectRequest('company', newItem.id)
                                "
                            >
                                Отклонить
                            </v-btn>
                            <v-btn
                                text
                                class="normal-text"
                                color="green"
                                @click="
                                    approveRequest('company', newItem.id)
                                "
                                >Принять</v-btn
                            >
                        </v-col>
                    </v-row>
                    <div v-if="oldItem" class="mb-5">
                        <v-row class="pb-5">
                            <v-col md="4">
                                <p>Прикрепить изображение</p>
                                <v-img
                                    style="cursor: pointer"
                                    height="170"
                                    width="260"
                                    :src="oldItem.mainimage_url"
                                    :lazy-src="oldItem.mainimage_url"
                                    @click="mainImageShow = true"
                                ></v-img>
                                <vue-easy-lightbox
                                    :visible="mainImageShow"
                                    :imgs="[oldItem.mainimage_url]"
                                    @hide="mainImageShow = false"
                                ></vue-easy-lightbox>
                            </v-col>
                            <v-col md="4">
                                <p>Прикрепить логотип</p>
                                <v-img
                                    style="cursor: pointer"
                                    height="170"
                                    width="260"
                                    :src="oldItem.logo_url"
                                    :lazy-src="oldItem.logo_url"
                                    @click="logoImageShow = true"
                                ></v-img>
                                <vue-easy-lightbox
                                    :visible="logoImageShow"
                                    :imgs="[oldItem.logo_url]"
                                    @hide="logoImageShow = false"
                                ></vue-easy-lightbox>
                            </v-col>
                        </v-row>
                        <v-row class="pt-0">
                            <v-col md="4" sm="6" xs="10">
                                <span>Наименование</span>
                                <v-text-field
                                    hide-details
                                    outlined
                                    placeholder="Введите наименование"
                                    dense
                                    color="#414042"
                                    readonly
                                    :value="oldItem.name"
                                ></v-text-field>
                            </v-col>
                            <v-col md="4" sm="6" xs="10">
                                <span>ИНН</span>
                                <v-text-field
                                    hide-details
                                    outlined
                                    placeholder="Введите ИНН"
                                    dense
                                    color="#414042"
                                    readonly
                                    :value="oldItem.inn"
                                ></v-text-field>
                            </v-col>
                            <v-col md="4" sm="6" xs="10">
                                <span>Юридическое лицо</span>
                                <v-text-field
                                    hide-details
                                    outlined
                                    placeholder="Введите наименование"
                                    dense
                                    readonly
                                    color="#414042"
                                    v-model="oldItem.entity"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <span>Описание</span>
                                <v-textarea
                                    hide-details
                                    outlined
                                    placeholder="Введите текст..."
                                    color="#414042"
                                    readonly
                                    v-model="oldItem.description"
                                ></v-textarea>
                            </v-col>
                        </v-row>
                        <div class="header-text">
                            <h3 class="mt-4">Время работы</h3>
                        </div>
                        <v-row v-for="(item, index) in oldItem.timeframes" :key="index" class="mb-5">
                            <v-col md="6" sm="12">
                                <span>День недели</span>
                                <v-autocomplete
                                    :items="days"
                                    dense
                                    chips
                                    multiple
                                    outlined
                                    hide-details
                                    readonly
                                    v-model="item.working_days"
                                ></v-autocomplete>
                            </v-col>
                            <v-col md="2" sm="12">
                                <span>Время работы</span>
                                <v-autocomplete
                                    :items='item.working_starts_at ? [ item.working_starts_at.substr(0, 2) + ":" + item.working_starts_at.substr(3, 2) + " - " + item.working_ends_at.substr(0, 2) + ":" + item.working_ends_at.substr(3, 2)] : []'
                                    outlined
                                    dense
                                    class="time-text-field"
                                    chips
                                    hide-details
                                    :value='item.working_starts_at ? item.working_starts_at.substr(0, 2) + ":" + item.working_starts_at.substr(3, 2) + " - " + item.working_ends_at.substr(0, 2) + ":" + item.working_ends_at.substr(3, 2) : null'
                                    readonly
                                    disabled
                                >
                                </v-autocomplete>
                            </v-col>
                            <v-col md="4" sm="12">
                                <span>Перерыв</span>
                                    <v-autocomplete
                                        :items="getBreakTimes(item.break_times)"
                                        dense
                                        chips
                                        multiple
                                        outlined
                                        hide-details
                                        :value="getBreakTimes(item.break_times)"
                                        readonly
                                    >
                                    </v-autocomplete>
                            </v-col>
                        </v-row>
                    </div>
                    <div v-else>
                        Здесь сейчас пусто.
                    </div>
                </v-tab-item>
                <v-tab-item>
                    <v-row v-if="newItem" class="pt-0">
                        <v-col md="8">
                            <div class="header-text">
                                <h3>{{ newItem.name }}</h3>
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
                                    rejectRequest('company', newItem.id)
                                "
                            >
                                Отклонить
                            </v-btn>
                            <v-btn
                                text
                                class="normal-text"
                                color="green"
                                @click="
                                    approveRequest('company', newItem.id)
                                "
                                >Принять</v-btn
                            >
                        </v-col>
                    </v-row>
                    <div v-if="newItem" class="mb-5">
                        <v-row class="pb-5">
                            <v-col md="4">
                                <p>Прикрепить изображение</p>
                                <v-img
                                    style="cursor: pointer"
                                    height="170"
                                    width="260"
                                    :src="newItem.mainimage_url"
                                    :lazy-src="newItem.mainimage_url"
                                    @click="mainImageShow = true"
                                ></v-img>
                                <vue-easy-lightbox
                                    :visible="mainImageShow"
                                    :imgs="[newItem.mainimage_url]"
                                    @hide="mainImageShow = false"
                                ></vue-easy-lightbox>
                            </v-col>
                            <v-col md="4">
                                <p>Прикрепить логотип</p>
                                <v-img
                                    style="cursor: pointer"
                                    height="170"
                                    width="260"
                                    :src="newItem.logo_url"
                                    :lazy-src="newItem.logo_url"
                                    @click="logoImageShow = true"
                                ></v-img>
                                <vue-easy-lightbox
                                    :visible="logoImageShow"
                                    :imgs="[newItem.logo_url]"
                                    @hide="logoImageShow = false"
                                ></vue-easy-lightbox>
                            </v-col>
                        </v-row>
                        <v-row class="pt-0">
                            <v-col md="4" sm="6" xs="10">
                                <span>Наименование</span>
                                <v-text-field
                                    hide-details
                                    outlined
                                    placeholder="Введите наименование"
                                    dense
                                    color="#414042"
                                    readonly
                                    :value="newItem.name"
                                ></v-text-field>
                            </v-col>
                            <v-col md="4" sm="6" xs="10">
                                <span>ИНН</span>
                                <v-text-field
                                    hide-details
                                    outlined
                                    placeholder="Введите ИНН"
                                    dense
                                    color="#414042"
                                    readonly
                                    :value="newItem.inn"
                                ></v-text-field>
                            </v-col>
                            <v-col md="4" sm="6" xs="10">
                                <span>Юридическое лицо</span>
                                <v-text-field
                                    hide-details
                                    outlined
                                    placeholder="Введите наименование"
                                    dense
                                    readonly
                                    color="#414042"
                                    v-model="newItem.entity"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <span>Описание</span>
                                <v-textarea
                                    hide-details
                                    outlined
                                    placeholder="Введите текст..."
                                    color="#414042"
                                    readonly
                                    v-model="newItem.description"
                                ></v-textarea>
                            </v-col>
                        </v-row>
                        <div class="header-text">
                            <h3 class="mt-4">Время работы</h3>
                        </div>
                        <v-row v-for="(item, index) in newItem.timeframes" :key="index" class="mb-1">
                            <v-col md="6" sm="12">
                                <span>День недели</span>
                                <v-autocomplete
                                    :items="days"
                                    dense
                                    chips
                                    multiple
                                    outlined
                                    hide-details
                                    readonly
                                    v-model="item.working_days"
                                ></v-autocomplete>
                            </v-col>
                            <v-col md="2" sm="12">
                                <span>Время работы</span>
                                <v-autocomplete
                                    :items='item.working_starts_at ? [item.working_starts_at.substr(0, 2) + ":" + item.working_starts_at.substr(3, 2) + " - " + item.working_ends_at.substr(0, 2) + ":" + item.working_ends_at.substr(3, 2)] : []'
                                    outlined
                                    dense
                                    class="time-text-field"
                                    chips
                                    hide-details
                                    :value='item.working_starts_at ? item.working_starts_at.substr(0, 2) + ":" + item.working_starts_at.substr(3, 2) + " - " + item.working_ends_at.substr(0, 2) + ":" + item.working_ends_at.substr(3, 2) : null'
                                    readonly
                                    disabled
                                >
                                </v-autocomplete>
                            </v-col>
                            <v-col md="4" sm="12">
                                <span>Перерыв</span>
                                    <v-autocomplete
                                        :items="getBreakTimes(item.break_times)"
                                        dense
                                        chips
                                        multiple
                                        outlined
                                        hide-details
                                        :value="getBreakTimes(item.break_times)"
                                        readonly
                                    >
                                    </v-autocomplete>
                            </v-col>
                        </v-row>
                    </div>
                </v-tab-item>
            </v-tabs>
        </div>
    </v-main>
</template>

<script>
import VueEasyLightbox from "vue-easy-lightbox";
import firebase from "firebase";
export default {
    components: {
        VueEasyLightbox,
    },
    created() {
        this.$store
            .dispatch("getCompanyRequestById", this.companyId)
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
            });
    },
    data() {
        return {
            companyId: this.$route.params.id,
            newItem: null,
            oldItem: null,

            rejectComment: null,
            rejectImages: null,

            rejectAttachImages: null,

            galleryShow: false,
            logoImageShow: false,
            mainImageShow: false,

            days: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],

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
                });
        },
        getBreakTimes(_break_times){
            let break_times = []
            if (_break_times){
                _break_times.map(time =>{
                    break_times.push(time.start + ' - ' + time.end)
                })
            }
            return break_times
        }
    },
};
</script>

<style>
</style>
