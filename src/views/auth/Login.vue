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
          <v-card-title>
            <v-row justify="center" align-content="center">
              <h1 class="display-1">Login</h1>
            </v-row>
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field
                prepend-icon="mdi-account-circle"
                label="username"
              />
              <v-text-field
                prepend-icon="mdi-lock"
                :append-icon="password.icon"
                @click:append="changeShowPassword"
                :type="password.type"
                label="password"
              />
              <v-card-actions>
                <v-row justify="center" align-content="center">
                  <v-btn color="primary">Login</v-btn>
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
      password: {
        isShowPassword: false,
        type: "password",
        icon: "mdi-eye-off",
      },
    };
  },
  methods: {
    changeShowPassword() {
      this.password.isShowPassword = !this.password.isShowPassword;
      if (this.password.isShowPassword) {
        this.password.type = "text";
        this.password.icon = "mdi-eye";
      } else {
        this.password.type = "password";
        this.password.icon = "mdi-eye-off";
      }
    },
  },
};
</script>