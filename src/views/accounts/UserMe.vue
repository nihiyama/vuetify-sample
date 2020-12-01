<template>
  <v-app>
    <AppBar></AppBar>
    <v-main>
      <template>
        <v-container fluid>
          <h1>Me</h1>
          <v-card class="mt-5 mx-10 py-3 px-10">
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="user.name"
                  label="Name"
                  disabled
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6"></v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="user.password"
                  :rules="[rules.required]"
                  label="Password"
                  :type="'password'"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="confirmPassword"
                  :rules="[
                    rules.required,
                    rules.match(confirmPassword, user.password),
                  ]"
                  label="Confirm password"
                  :type="'password'"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="8">
                <v-select
                  v-model="user.tenantNames"
                  :items="allTenants"
                  label="Tenants"
                  multiple
                  chips
                  persistent-hint
                  disabled
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="8"></v-col>
              <v-col cols="12" sm="2">
                <v-btn color="gray" @click="cancel">Cancel</v-btn>
              </v-col>
              <v-col cols="12" sm="2">
                <v-btn color="primary" @click="execUser">update</v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-container>
      </template></v-main
    ></v-app
  >
</template>

<script>
import AppBar from "@/components/AppBar.vue";

export default {
  data: () => ({
    user: {
      id: null,
      name: "",
      password: null,
      tenantNames: [],
    },
    allTenants: [],
    rules: {
      required: (value) => !!value || "Required.",
      match: (val1, val2) => val1 == val2 || "Not Match.",
    },
    confirmPassword: "",
  }),
  created() {
    this.$store.dispatch("getMe").then(() => {
      const name = this.$store.getters.me.name;
      const tenantNames = this.$store.getters.me.tenants;
      this.user = {
        ...this.$store.getters.me.tenants,
        name: name,
        password: null,
        tenantNames: tenantNames,
      };
    });
    this.$store.dispatch("getTenants").then(() => {
      this.allTenants = this.$store.getters.tenants.map(
        (tenant) => tenant.name
      );
    });
  },
  components: {
    AppBar,
  },
  methods: {
    cancel() {
      this.$router.push({
        name: "home",
      });
    },
    execUser() {
      if (this.user.password == this.confirmPassword) {
        this.$store.dispatch("updateMe", this.user);
        this.$router.push({
          name: "home",
        });
      }
    },
  },
};
</script>