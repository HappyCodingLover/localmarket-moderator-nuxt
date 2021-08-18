<template>
    <v-app>
        <v-overlay z-index="7" :value="apiProcessing">
            <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>
        <v-navigation-drawer
            class="navbar"
            app
            left
            permanent
            v-if="isLoggedIn"
        >
            <v-img
                class="ml-6 mt-10 mb-8"
                src="/img/logo.svg"
                width="60px"
            ></v-img>
            <v-list nav>
                <v-list-item color="#8d8d8d" dense link to="/requests">
                    <v-list-item-avatar>
                        <v-icon>mdi-format-list-bulleted-square</v-icon>
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title>Заявки на модерацию</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item color="#8d8d8d" dense link to="/partners">
                    <v-list-item-avatar>
                        <v-icon>mdi-contacts</v-icon>
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title>Партнеры</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item color="#8d8d8d" dense link to="/orders">
                    <v-list-item-avatar>
                        <v-icon>mdi-text-box-multiple</v-icon>
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title>Заказы</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
            <div class="bottom">
                <v-btn class="btn-logout" text @click="logout">
                    <img src="/img/back.svg" alt="logout" />
                    <span class="text">Выйти</span>
                </v-btn>
            </div>
        </v-navigation-drawer>
        <router-view></router-view>
        <v-snackbar
            v-model="snackbar"
            timeout="4000"
            >
            {{alertText}}
            <template v-slot:action="{ attrs }">
                <v-btn
                color="blue"
                text
                v-bind="attrs"
                @click="snackbar = false"
                >
                Close
                </v-btn>
            </template>
        </v-snackbar>
    </v-app>
</template>

<script>
export default {
    computed: {
        isLoggedIn() {
            return this.$store.getters.isLoggedIn;
        },
    },
    data() {
        return {
          apiProcessing: false,
          snackbar: false,
          alertText: null
        };
    },
    methods: {
        async logout() {
            await this.$store.dispatch("logout");
            this.$router.push("/");
        },
    },
    created: function () {
        this.apiProcessing = this.$store.state.apiProcessing
        const context = this;
        this.$http.interceptors.response.use(undefined, async function (err) {
            if (err.response.status === 401 || err.response.status === 403) {
                await context.logout();
            }
            else {
                if (err && err.response && err.response.data){
                    return Promise.reject(err.response.data)
                }
                else {
                    return Promise.reject(err)
                }
            }
        });
    },
    watch: {
      "$store.state.apiProcessing": function () {
        this.apiProcessing = this.$store.state.apiProcessing
      },
      "$store.state.alert": function () {
        this.snackbar = this.$store.state.alert.show
        this.alertText = this.$store.state.alert.text
      }
    },
};
</script>

<style>
.navbar .v-list--nav {
    padding: 0px;
}
.navbar .v-list--nav .v-list-item {
    margin: 0px !important;
}
.navbar .v-list-item::before,
.v-ripple__container {
    border-radius: 0px !important;
}
.navbar .v-list-item--active .v-avatar {
    color: #ff2d34;
}
.navbar .v-list-item--active .v-list-item__title {
    color: #ff2d34;
}
.navbar .bottom {
    background: url(/img/navbar-bottom.svg);
    background-repeat: no-repeat;
    height: 100px;
    position: absolute;
    bottom: 0px;
    width: 100%;
}
.navbar .bottom .btn-logout {
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translate(0%, -50%);
    padding: 0 10px !important;
}
.navbar .bottom .btn-logout .text {
    text-transform: none;
    margin-left: 10px;
}

.v-main {
    background: #fafafa;
}
.root {
    padding: 30px 20px 10px;
}
.root h2 {
    font-weight: 700;
}
.v-tab {
    text-transform: none !important;
    letter-spacing: 0.3px !important;
    width: 165px !important;
}
.v-tabs-items {
    background-color: transparent !important;
    margin-top: 20px;
}
.v-window{
    overflow:inherit;
}
.v-application .headline {
    font-size: 14pt !important;
}
span,
label,
input,
textarea {
    font-size: 11pt;
}
.flex-layout {
    display: flex;
}
.grey-text {
    color: #4d4f52 !important;
    font-weight: 300;
}
.normal-text {
    text-transform: none !important;
    letter-spacing: 0.3px;
}
.time-text-field input {
    text-align: center;
}
.v-chip--disabled {
    opacity: 1 !important;
}
.time-input {
    border: 1px solid;
    border-color: #999;
    width: 50%;
    padding: 3px;
    text-align: center;
    height: 40px;
    outline: none;
}
.time-input.left {
    border-radius: 5px 0px 0px 5px;
}
.time-input.right {
    border-radius: 0px 5px 5px 0px;
}
.bold{
    font-weight: 700;
}
.thin{
    font-weight: 300;
}
.center{
    text-align: center;
}
.left{
    text-align: left;
}
.right{
    text-align: right;
}
.absolute{
    position:absolute;
}
.relative{
    position: relative;
}
.auto{
    margin:auto;
}
.top-btn-group {
    position: absolute;
    top: -65px;
    right: 0px;
}
.v-slide-group__content.v-tabs-bar__content{
    border-bottom:2px solid #E6E7E8;
    margin-bottom:3px;
}
.r-0{
    right:0px;
}
.header-text {
    display: flex;
}
.header-text h3 {
    font-weight: 700;
}
.header-text .text {
    margin-left: 34px;
    padding-top: 5px;
    font-size: 10pt;
}
.row{
    margin-right: -12px;
    margin-left: -12px;
    margin-bottom: 0px;
    margin-top: 0px;
}
</style>
