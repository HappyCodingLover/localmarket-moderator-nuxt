<template>
    <v-main>
        <div class="root">
            <h2>Добавить партнера</h2>
            <v-tabs
                background-color="transparent"
                color="#FF2D34"
                height="50"
                class="pt-2 pb-2"
                v-model="tab"
            >
                <v-tab> Информация </v-tab>
                <v-tab> Адреса </v-tab>
                <v-tab> Данные в кабинете </v-tab>
                <v-tab-item>
                    <v-row class="pt-2 mr-1">
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
                        <v-col md="12">
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
                    </v-row>
                </v-tab-item>
                <v-tab-item>
                    <div style="min-height:400px">
                        <v-row class="pt-3">
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
                    </div>
                </v-tab-item>
                <v-tab-item>
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
                </v-tab-item>
            </v-tabs>
            <v-btn
                dark
                height="50"
                width="300"
                color="red"
                @click="createPartner"
            >
                <span style="text-transform: none">Добавить</span>
            </v-btn>
        </div>
    </v-main>
</template>

<script>
import firebase from "firebase";
import VueDadata from "@fivestarsmobi/vue-dadata";
export default {
    components: {
        "vue-dadata": VueDadata,
    },
    data() {
        return {
            tab: null,
            name: null,
            inn: null,
            entity: null,
            description: null,
            newImageData: null,

            address: null,
            legal_address: null,
            login: null,
            password: null,
            phone: null,
            email: null,

            locations:{
                language: "ru",
                locations: [
                    {
                        "region_fias_id": "29251dcf-00a1-4e34-98d4-5c47484a36d4",
                    },
                    {
                        "region": "Москва"
                    },
                ]
            },

            passwordGeneratePopup: false,
            generatedPassword: null,

            showPassword: true
        };
    },
    mounted() {
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
        }, 2000);
    },
    methods: {
        createPartner() {
          if (!this.name || this.name.trim() == ''){
            this.$store.commit('setAlert', {
                show: true,
                text: 'Пожалуйста, введите наименование'
            })
            this.tab = 0
            return
          }
          if (!this.entity || this.entity.trim() == ''){
            this.$store.commit('setAlert', {
                show: true,
                text: 'Пожалуйста, введите юридическое лицо'
            })
            this.tab = 0
            return
          }
          if (!this.inn || this.inn.trim() == ''){
            this.$store.commit('setAlert', {
                show: true,
                text: 'Пожалуйста, введите ИНН'
            })
            this.tab = 0
            return
          }
          if (!this.description || this.description.trim() == ''){
            this.$store.commit('setAlert', {
                show: true,
                text: 'Пожалуйста, введите описание'
            })
            this.tab = 0
            return
          }
          if (!this.newImageData){
            this.$store.commit('setAlert', {
                show: true,
                text: 'Пожалуйста, загрузите изображение с логотипом'
            })
            this.tab = 0
            return
          }
          if (!this.address || this.address.trim() === ''){
            this.$store.commit('setAlert', {
                show: true,
                text: 'Пожалуйста, выберите корректный адрес'
            })
            this.tab = 1
            return
          }
          if (!this.login || this.login.trim() == ''){
            this.$store.commit('setAlert', {
                show: true,
                text: 'Пожалуйста, введите логин'
            })
            this.tab = 2
            return
          }
          if (!this.password || this.password.trim() == ''){
            this.$store.commit('setAlert', {
                show: true,
                text: 'Пожалуйста, введите пароль'
            })
            this.tab = 2
            return
          }
          if (!this.phone || this.phone.trim() == ''){
            this.$store.commit('setAlert', {
                show: true,
                text: 'Пожалуйста, введите контактный телефон'
            })
            this.tab = 2
            return
          }
          if (!this.email || this.email.trim() == ''){
            this.$store.commit('setAlert', {
                show: true,
                text: 'Пожалуйста, введите email'
            })
            this.tab = 2
            return
          }
          this.$store.dispatch("setProcessing", true);
          const time = new Date().getTime();
          const storageRef = firebase
              .storage()
              .ref(`/logo_images/${time}`)
              .put(this.newImageData);
          storageRef.on(
              `state_changed`,
              (snapshot) => {
                  var progress =
                      (snapshot.bytesTransferred / snapshot.totalBytes) *
                      100;
                  console.log("Upload is " + progress + "% done");
              },
              (error) => {
                  this.$store.commit('setAlert', {
                      show: true,
                      text: error.message
                  })
                  this.$store.dispatch("setProcessing", false);
              },
              () => {
                  storageRef.snapshot.ref
                      .getDownloadURL()
                      .then((logo_url) => {
                          let data = {
                              name: this.name,
                              inn: this.inn,
                              entity: this.entity,
                              description: this.description,
                              logo_url,
                              login: this.login,
                              phone: this.phone,
                              email: this.email,
                              password: this.password,
                              address: this.address
                          };
                          if (this.legal_address && this.legal_address.trim() !== ''){
                              data.legal_address = this.legal_address
                          }
                          this.$store
                              .dispatch("createNewPartner", data)
                              .then(() => {
                                this.$store.dispatch("getPartners")
                                this.$router.push("/partners");
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
                    });
              }
          );
        },
        addressChange(data) {
            this.address = data.value;
        },
        legalAddressChange(data){
            this.legal_address = data.value
        },
        dynamicID() {
            return (
                "dynamicID-" + Math.floor(Math.random() * Date.now().toString())
            );
        },
        passwordPopupShow() {
            this.passwordGeneratePopup = true;
        },
        passwordGeneratePopupOutClickCallback() {
            this.passwordGeneratePopup = false;
        },
    },
};
</script>

<style>
</style>
