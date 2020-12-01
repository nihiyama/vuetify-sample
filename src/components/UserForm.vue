<template>
  <v-container fluid>
    <h1>{{ title }}</h1>
    <v-card class="mt-5 mx-10 py-3 px-10">
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="user.name"
            :rules="[rules.required]"
            label="Name"
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
          ></v-select>
        </v-col>
        <v-col cols="12" sm="1" class="my-auto">
          <v-btn icon>
            <v-icon large color="black darken-2" dark> mdi-plus </v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6">
          <v-checkbox
            v-model="user.isSuperuser"
            label="isSuperuser?"
            color="info"
            value=""
            hide-details
          ></v-checkbox>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="8"></v-col>
        <v-col cols="12" sm="2">
          <v-btn color="gray" @click="cancel">Cancel</v-btn>
        </v-col>
        <v-col cols="12" sm="2">
          <v-btn color="primary" @click="execUser">{{ execType }}</v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    allTenants: [],
    rules: {
      required: (value) => !!value || "Required.",
      match: (val1, val2) => val1 == val2 || "Not Match.",
    },
    confirmPassword: "",
  }),
  created() {
    this.$store.dispatch("getTenants").then(() => {
      this.allTenants = this.$store.getters.tenants.map(
        (tenant) => tenant.name
      );
    });
  },
  props: {
    title: {
      type: String,
      require: true,
    },
    user: {
      type: Object,
      require: true,
    },
    execType: {
      type: String,
      require: true,
    },
  },
  methods: {
    cancel() {
      this.$router.push({
        name: "users",
      });
    },
    execUser() {
      if (
        this.execType == "create" &&
        this.user.name != "" &&
        this.user.password != "" &&
        this.user.password == this.confirmPassword
      ) {
        this.$store.dispatch("createUser", this.user);
        this.$router.push({
          name: "users",
        });
      } else if (
        this.execType == "update" &&
        this.user.password == this.confirmPassword
      ) {
        this.$store.dispatch("updateUser", this.user);
        this.$router.push({
          name: "users",
        });
      }
    },
  },
};
</script>