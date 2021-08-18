<template>
  <v-main>
    <div class="login-panel">
      <v-img class="logo" src="/img/logo.svg" max-width="66px" max-height="51px" />
      <div class="login-input">
        <p class="label">Логин</p>
        <v-text-field @keyup="submit" placeholder="Введите логин" color="#414042" :error="loginFailed" v-model="login" outlined hide-details dense></v-text-field>
        <p class="label mt-5">Пароль</p>
        <v-text-field autocomplete="one-time-code" id="prevent_autofill" name="prevent_autofill" @keyup="submit" placeholder="Введите пароль" color="#414042" :error="loginFailed" v-model="password" outlined hide-details dense type="password"></v-text-field>
        <p class="label" style="color:red;float:right" v-show="loginFailed">Неверный логин или пароль</p>
      </div>
      <v-btn class="mt-7" width="100%" height="40px" color="#FF2D34" :loading="loading" dark up @click="doLogin()">Войти</v-btn>
    </div>
  </v-main>
</template>

<script>
export default {
  data() {
    return {
      login: null,
      password: null,
      loginFailed : false,
      loading: null
    }
  },
  created() {
    if (this.$store.getters.isLoggedIn){
      this.$router.push("/requests")
    }
  },
  methods: {
    submit (key) {
      if (key.key === "Enter"){
        this.doLogin()
      }
    },
    doLogin() {
      const login = this.login
      const password = this.password
      this.loading = true
      this.$store
        .dispatch("login", { login, password })
        .then(() => this.$router.push("/requests"))
        .catch(() => {
          this.loginFailed = true
          this.loading = false
        });
    },
  }
};
</script>

<style scoped>
.login-panel {
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
}
.login-panel .logo {
  margin: auto;
}
.login-panel .login-input {
  margin-top: 40px;
  min-width: 300px;
  width: 300px;
}
.login-panel .login-input .label {
  color: #414042;
  font-size: 11pt;
  margin-bottom: 5px;
  margin-left: 5px;
  font-weight: 300;
}
.login-panel .login-input .forgot-link {
  color: #414042;
  text-decoration: none;
  margin-top: 3px;
  font-size: 11pt;
}
.login-panel .login-input .forgot-link:hover {
  text-decoration: underline;
}
</style>
<style>
.login-panel .v-btn__content {
  text-transform: none !important;
}
</style>
