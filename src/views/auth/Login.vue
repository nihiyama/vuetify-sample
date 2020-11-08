<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center" align-content="center">
          <div class="align-center">
            <v-img
              alt="Vuetify Logo"
              class="shrink mr-2"
              contain
              src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
              transition="scale-transition"
              width="200"
            />
          </div>
        </v-row>
        <v-card width="400px" class="mx-auto mt-5">
          <v-card-text>
            <v-form>
              <v-text-field
                prepend-icon="mdi-account-circle"
                label="username"
                v-model="username"
              />
              <v-text-field
                prepend-icon="mdi-lock"
                :append-icon="passState.icon"
                @click:append="changeShowPassword"
                @keyup.enter.native="login"
                :type="passState.type"
                v-model="password"
                label="password"
              />
              <v-card-actions>
                <v-row justify="center" align-content="center">
                  <v-btn color="primary" @click="login">Login</v-btn>
                </v-row>
              </v-card-actions>
            </v-form>
          </v-card-text>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      passState: {
        isShowPassword: false,
        type: "password",
        icon: "mdi-eye-off",
      },
    };
  },
  methods: {
    changeShowPassword() {
      this.passState.isShowPassword = !this.passState.isShowPassword;
      if (this.passState.isShowPassword) {
        this.passState.type = "text";
        this.passState.icon = "mdi-eye";
      } else {
        this.passState.type = "password";
        this.passState.icon = "mdi-eye-off";
      }
    },
    login() {
      this.$store.dispatch("login", {
        username: this.username,
        password: this.password,
      });
      this.username = "";
    },
  },
};
</script>