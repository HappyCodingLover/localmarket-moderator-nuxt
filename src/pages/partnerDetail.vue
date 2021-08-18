<template>
    <v-main>
        <div class="root">
            <h2>Изменить партнера</h2>
        </div>
        <div class="mt-3 ml-5" v-if="partner">
            <v-tabs
                background-color="transparent"
                color="#FF2D34"
                height="50"
                class="mt-2"
            >
                <v-tab> Информация </v-tab>
                <v-tab> Адреса </v-tab>
                <v-tab> Данные в кабинете </v-tab>
                <div class="flex right mr-3" style="align-self: center">
                    <v-btn
                        text
                        class="normal-text"
                        width="160"
                        v-if="partner.blocked === 0"
                        @click="partnerArchive"
                    >
                        <v-icon size="18" class="mr-1">mdi-package-down</v-icon>
                        Архивировать
                    </v-btn>
                    <v-btn
                        text
                        class="normal-text"
                        width="100"
                        v-else
                        @click="partnerRestore"
                    >
                        <v-icon size="18" class="mr-1">mdi-restore</v-icon>
                        Восстановить
                    </v-btn>
                    <v-btn
                        text
                        class="normal-text ml-2"
                        color="red"
                        width="100"
                        @click="deleteConfirmDialog = true"
                    >
                        <v-icon size="20" class="mr-1">mdi-close</v-icon>
                        Удалить
                    </v-btn>
                </div>
                <v-tab-item>
                    <div class="mb-5">
                        <div class="flex-layout">
                            <h3 style="margin: auto">{{ partner.name }}</h3>
                            <div class="pt-1" v-if="partner.blocked === 1">
                                <v-badge
                                    dot
                                    color="grey"
                                    left
                                    offset-x="0"
                                    offset-y="0"
                                    outline
                                    bordered
                                    class="ml-10 mr-2"
                                ></v-badge>
                                <span class="grey-text pt-2">В архиве</span>
                            </div>
                            <div class="flex right mr-3">
                                <v-btn
                                    text
                                    class="normal-text ml-2"
                                    @click="exportCSVorders"
                                >
                                    <v-icon size="18" class="mr-1"
                                        >mdi-cloud-download</v-icon
                                    >
                                    Экспорт заказов
                                </v-btn>
                            </div>
                        </div>
                        <v-row class="mt-1 mb-1">
                            <v-col md="4">
                                <p>Прикрепить изображение</p>
                                <v-img
                                    style="cursor: pointer"
                                    height="170"
                                    width="260"
                                    :src="partner.mainimage_url"
                                    :lazy-src="partner.mainimage_url"
                                    @click="mainImageShow = true"
                                ></v-img>
                                <vue-easy-lightbox
                                    :visible="mainImageShow"
                                    :imgs="[partner.mainimage_url]"
                                    @hide="mainImageShow = false"
                                ></vue-easy-lightbox>
                            </v-col>
                            <v-col md="4">
                                <p>Прикрепить логотип</p>
                                <v-img
                                    style="cursor: pointer"
                                    height="170"
                                    width="260"
                                    :src="partner.logo_url"
                                    :lazy-src="partner.logo_url"
                                    @click="logoImageShow = true"
                                ></v-img>
                                <vue-easy-lightbox
                                    :visible="logoImageShow"
                                    :imgs="[partner.logo_url]"
                                    @hide="logoImageShow = false"
                                ></vue-easy-lightbox>
                            </v-col>
                        </v-row>
                        <v-row class="mt-2 mr-1">
                            <v-col md="4">
                                <span>Наименование</span>
                                <v-text-field
                                    placeholder="Введите наименование"
                                    outlined
                                    dense
                                    color="#414042"
                                    v-model="name"
                                ></v-text-field>
                            </v-col>
                            <v-col md="4">
                                <span>ИНН</span>
                                <v-text-field
                                    placeholder="Введите ИНН"
                                    outlined
                                    dense
                                    color="#414042"
                                    v-model="inn"
                                ></v-text-field>
                            </v-col>
                            <v-col md="4">
                                <span>Юридическое лицо</span>
                                <v-text-field
                                    placeholder="Введите наименование"
                                    outlined
                                    dense
                                    color="#414042"
                                    v-model="entity"
                                ></v-text-field>
                            </v-col>
                            <v-col md="12">
                                <span>Описание</span>
                                <v-textarea
                                    hide-details
                                    outlined
                                    placeholder="Введите текст..."
                                    color="#999"
                                    v-model="description"
                                ></v-textarea>
                            </v-col>
                            <v-col md="4">
                                <v-file-input
                                    rounded
                                    dense
                                    chips
                                    accept="image/*"
                                    label="Прикрепить изображение"
                                    class="mt-3"
                                    v-model="newImageData"
                                ></v-file-input>
                            </v-col>
                            <v-col md="4">
                                <v-file-input
                                    rounded
                                    dense
                                    chips
                                    accept="image/*"
                                    label="Прикрепить логотип"
                                    class="mt-3"
                                    v-model="newLogoData"
                                ></v-file-input>
                            </v-col>
                        </v-row>
                        <v-btn
                            dark
                            height="50"
                            width="300"
                            color="red"
                            @click="savePartnerOverview"
                            ><span style="text-transform: none"
                                >Сохранить</span
                            ></v-btn
                        >
                    </div>
                </v-tab-item>
                <v-tab-item>
                    <div style="min-height:550px">
                        <v-row class="pt-2">
                            <v-col lg="6" md="12" sm="12">
                                <p class="mb-2">Основной адрес</p>
                                <vue-dadata
                                    placeholder="Введите адрес"
                                    :query="address"
                                    token="60d2678d4b84bf022b27ee643f49d1b1f86290b8"
                                    :onChange="addressChange"
                                    :locationOptions="locations"
                                ></vue-dadata>
                            </v-col>
                            <v-col lg="6" md="12" sm="12">
                                <p class="mb-2">Адрес компании</p>
                                <vue-dadata
                                    placeholder="Введите адрес"
                                    :query="legal_address"
                                    token="60d2678d4b84bf022b27ee643f49d1b1f86290b8"
                                    :onChange="legalAddressChange"
                                    :locationOptions="locations"
                                ></vue-dadata>
                            </v-col>
                        </v-row>
                        <v-btn
                            dark
                            height="50"
                            width="300"
                            color="red"
                            @click="savePartnerAddress"
                            class="mt-10"
                            ><span style="text-transform: none"
                                >Сохранить</span
                            ></v-btn
                        >
                    </div>
                </v-tab-item>
                <v-tab-item>
                    <h3 class="pt-2 mb-2">Изменить партнера</h3>
                    <v-row class="mr-2">
                        <v-col md="6" class="pb-3">
                            <span>Логин</span>
                            <v-text-field
                                hide-details
                                placeholder="Введите логин"
                                outlined
                                dense
                                color="#414042"
                                v-model="login"
                            ></v-text-field>
                        </v-col>
                        <v-col md="6" class="pb-3">
                            <span>Пароль</span>
                            <div
                                v-click-outside="
                                    passwordGeneratePopupOutClickCallback
                                "
                            >
                                <v-text-field
                                    :id="dynamicID()"
                                    autocomplete="one-time-code"
                                    :type="showPassword ? 'text' : 'password'"
                                    hide-details
                                    placeholder="Введите пароль"
                                    outlined
                                    dense
                                    color="#414042"
                                    v-model="password"
                                    @mouseup="passwordPopupShow"
                                    @click:append="showPassword = !showPassword"
                                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                ></v-text-field>
                                <v-card
                                    v-show="passwordGeneratePopup"
                                    elevation="3"
                                    color="#FFF"
                                    class="pa-2"
                                    style="position: absolute; z-index: 1"
                                >
                                    <p
                                        class="grey-text mb-0"
                                        style="font-size: 11pt"
                                    >
                                        Использовать предложенный пароль
                                    </p>
                                    <v-btn
                                        text
                                        @click="
                                            passwordGeneratePopup = false;
                                            password = generatedPassword;
                                        "
                                        class="pl-1 pr-1 normal-text"
                                        >{{ generatedPassword }}</v-btn
                                    >
                                </v-card>
                            </div>
                        </v-col>
                        <v-col md="6" class="pb-3">
                            <span>Контактный телефон</span>
                            <v-text-field
                                hide-details
                                placeholder="Введите контактный телефон"
                                outlined
                                dense
                                color="#414042"
                                v-model="phone"
                            ></v-text-field>
                        </v-col>
                        <v-col md="6" class="pb-3">
                            <span>Email</span>
                            <v-text-field
                                hide-details
                                placeholder="Введите email"
                                outlined
                                dense
                                color="#414042"
                                v-model="email"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-btn
                        dark
                        height="50"
                        width="300"
                        color="red"
                        @click="savePartnerAccountData"
                        class="mt-10"
                        ><span style="text-transform: none">Сохранить</span></v-btn
                    >
                </v-tab-item>
            </v-tabs>
        </div>
        <v-dialog v-model="deleteConfirmDialog" width="500">
            <v-card>
                <v-card-title class="headline">
                    <v-icon class="mr-2">mdi-delete</v-icon>
                    <h5>Подтверждение</h5>
                </v-card-title>
                <v-divider></v-divider>
                <p class="pa-10">Вы уверены, что хотите удалить партнера?</p>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        outlined
                        @click="deleteConfirmDialog = false"
                        color="#7d7d7d"
                        class="normal-text"
                        width="120"
                        height="40"
                    >
                        Отменить
                    </v-btn>
                    <v-btn
                        dark
                        @click="confirmDelete"
                        color="red"
                        class="normal-text"
                        width="120"
                        height="40"
                    >
                        Удалить
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-main>
</template>

<script>
import VueEasyLightbox from "vue-easy-lightbox";
import firebase from "firebase";
import VueDadata from "@fivestarsmobi/vue-dadata";
import Papa from "papaparse";
export default {
    components: {
        VueEasyLightbox,
        "vue-dadata": VueDadata,
    },
    created() {
        this.$store.dispatch("getPartners");
    },
    mounted() {
        this.$store.state.partners.some((partner) => {
            if (partner.id == this.partnerId) {
                this.partner = partner;
                return true;
            }
        });
        const Characters =
            "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789![]{}()%&*$#^<>~@|";
        this.generatedPassword = "";
        for (let i = 0; i < 16; i++) {
            this.generatedPassword += Characters.charAt(
                Math.floor(Math.random() * Characters.length)
            );
        }
        setTimeout(() => {
          this.showPassword = false
        }, 3000);
    },
    methods: {
        dynamicID() {
            return (
                "dynamicID-" + Math.floor(Math.random() * Date.now().toString())
            );
        },
        confirmDelete() {
            this.deleteConfirmDialog = false;
            this.$store.dispatch("deletePartner", this.partnerId).then(() => {
                this.$router.push("/partners");
            });
        },
        partnerArchive() {
            this.$store.dispatch("partnerArchive", this.partnerId).then(() => {
                this.$store.dispatch("getPartners");
            });
        },
        partnerRestore() {
            this.$store.dispatch("partnerRestore", this.partnerId).then(() => {
                this.$store.dispatch("getPartners");
            });
        },
        async savePartnerOverview() {
            if (this.name == "" || this.name.trim() == "") {
                this.$store.commit("setAlert", {
                    show: true,
                    text: "Пожалуйста, введите наименование",
                });
                return;
            }
            if (this.entity == "" || this.entity.trim() == "") {
                this.$store.commit("setAlert", {
                    show: true,
                    text: "Пожалуйста, введите юридическое лицо",
                });
                return;
            }
            if (this.inn == "" || this.inn.trim() == "") {
                this.$store.commit("setAlert", {
                    show: true,
                    text: "Пожалуйста, введите ИНН",
                });
                return;
            }
            if (this.description == "" || this.description.trim() == "") {
                this.$store.commit("setAlert", {
                    show: true,
                    text: "Пожалуйста, введите описание",
                });
                return;
            }
            this.$store.dispatch("setProcessing", true);
            let data = {
                name: this.name,
                inn: this.inn,
                entity: this.entity,
                description: this.description,
            };
            if (this.newImageData){
                data.mainimage_url = await this.uploadImage(this.newImageData);
            }
            if (this.newLogoData){
                data.logo_url = await this.uploadImage(this.newLogoData);
            }
            this.$store
            .dispatch("revisePartnerOverview", {
                company_id: this.partnerId,
                data,
            })
            .then(() => {
                this.newImageData = null;
                this.newLogoData = null
                this.$store.dispatch("getPartners").then(()=>{
                    this.$store.commit("setAlert", {
                        show: true,
                        text: "Данные успешно сохранены",
                    });
                });
            });
        },
        addressChange(data) {
            this.address = data.value;
        },
        legalAddressChange(data) {
            this.legal_address = data.value;
        },
        savePartnerAddress() {
            if (!this.address || this.address.trim() === '') {
                this.$store.commit("setAlert", {
                    show: true,
                    text: "Пожалуйста, выберите корректный адрес",
                });
                return;
            }
            const data = {
                address: this.address
            };
            if (this.legal_address && this.legal_address.trim() !== ''){
                data.legal_address = this.legal_address
            }
            this.$store
                .dispatch("revisePartnerAddress", {
                    company_id: this.partnerId,
                    data,
                })
                .then(() => {
                    this.$store.dispatch("getPartners").then(()=>{
                        this.$store.commit("setAlert", {
                            show: true,
                            text: "Данные успешно сохранены",
                        });
                    });
                });
        },
        savePartnerAccountData() {
            if (!this.login || this.login.trim() == "") {
                this.$store.commit("setAlert", {
                    show: true,
                    text: "Пожалуйста, введите логин",
                });
                return;
            }
            if (!this.phone || this.phone.trim() == "") {
                this.$store.commit("setAlert", {
                    show: true,
                    text: "Пожалуйста, введите контактный телефон",
                });
                return;
            }
            if (!this.email || this.email.trim() == "") {
                this.$store.commit("setAlert", {
                    show: true,
                    text: "Пожалуйста, введите email",
                });
                return;
            }
            let data = {
                login: this.login,
                phone: this.phone,
                email: this.email,
            };
            if (this.password && this.password.trim() != "") {
                data.password = this.password;
            }
            this.$store
                .dispatch("revisePartnerAccount", {
                    company_id: this.partnerId,
                    data,
                })
                .then(() => {
                    this.$store.dispatch("getPartners").then(()=>{
                        this.$store.commit("setAlert", {
                            show: true,
                            text: "Данные успешно сохранены",
                        });
                    });
                }).catch(err =>{
                    if (err.message === 'login is using'){
                        this.$store.commit("setAlert", {
                            show: true,
                            text: "Данный логин уже занят",
                        });
                        return;
                    }
                    this.$store.commit("setAlert", {
                        show: true,
                        text: err.message,
                    });
                });
        },
        exportCSVorders() {
            this.$store.dispatch("exportCSVforCompany", this.partnerId).then((data) => {
                let blob = new Blob(
                    [
                        "\uFEFF" + Papa.unparse({
                            data,
                            fields: [
                                "Номер",
                                "ID заказа",
                                "Сумма заказа",
                                "Сумма заказа с учетом промокода",
                                "Комиссия",
                                "Сумма с учетом комиссии",
                                "Дата заказа",
                                "Время заказа",
                                "Статус заказа",
                                "Адрес заказа",
                            ],
                        },
                        {delimiter: ';'}
                        ),
                    ],
                    { type: "data:text/csv;charset=UTF8;base64" }
                );
                var link = document.createElement("a");
                var url = URL.createObjectURL(blob);
                link.setAttribute("href", url);
                link.setAttribute("download", "Orders.csv");
                link.style.visibility = "hidden";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            });
        },
        passwordPopupShow() {
            this.passwordGeneratePopup = true;
        },
        passwordGeneratePopupOutClickCallback() {
            this.passwordGeneratePopup = false;
        },
        async uploadImage(Image){
            return await new Promise((resolve, reject) =>{
                try {
                    const time = new Date().getTime();
                    const storageRef = firebase.storage().ref(`/logo_images/${time}`).put(Image);
                    storageRef.on(
                        `state_changed`,
                        (snapshot) => {
                            var progress =
                                (snapshot.bytesTransferred / snapshot.totalBytes) *
                                100;
                            console.log("Upload is " + progress + "% done");
                        },
                        (error) => {
                            reject(error)
                            this.$store.dispatch("setProcessing", false);
                        },
                        async () => {
                            return resolve(await storageRef.snapshot.ref.getDownloadURL())
                        })
                } catch (error) {
                    return reject(error)
                }
            })
        },
    },
    data() {
        return {
            partnerId: this.$route.params.id,
            partner: null,

            galleryShow: false,
            logoImageShow: false,
            mainImageShow: false,
            deleteConfirmDialog: false,

            newImageData: null,
            newLogoData: null,

            name: null,
            inn: null,
            entity: null,
            description: null,
            address: null,
            legal_address: null,
            login: null,
            password: null,
            phone: null,
            email: null,

            locations: {
                language: "ru",
                locations: [
                    {
                        "region_fias_id": "29251dcf-00a1-4e34-98d4-5c47484a36d4",
                    },
                    {
                        "region": "Москва"
                    }
                ],
            },

            passwordGeneratePopup: false,
            generatedPassword: null,

            showPassword: true
        };
    },
    watch: {
        "$store.state.partners": function () {
            this.$store.state.partners.some((partner) => {
                if (partner.id == this.partnerId) {
                    this.partner = partner;
                    return true;
                }
            });
        },
        partner: function () {
            this.name = this.partner.name;
            this.inn = this.partner.inn;
            this.entity = this.partner.entity;
            this.description = this.partner.description;
            this.address = this.partner.address;
            this.legal_address = this.partner.legal_address
            this.login = this.partner.accountData.login;
            this.phone = this.partner.accountData.phone;
            this.email = this.partner.accountData.email;
        },
    },
};
</script>

<style>
.vue-dadata__input {
    border-color: #7e8082 !important;
}
.vue-dadata__input:focus {
    border-color: #000 !important;
    border: 2px solid;
    box-shadow: none !important;
}
.vue-dadata__suggestions {
    position: absolute;
    z-index: 999;
}
.address-input-highlight {
    color: black;
}
.v-input__slot fieldset legend {
    display: none;
}
.v-input__slot {
    margin-top: 3px;
}
</style>
