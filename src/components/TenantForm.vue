<template>
  <v-container fluid>
    <h1>{{ title }}</h1>
    <v-card class="mt-5 mx-10 py-3 px-10">
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="tenant.name"
            :rules="[rules.required]"
            label="Name"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6"></v-col>
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
    rules: {
      required: (value) => !!value || "Required.",
    },
  }),
  props: {
    title: {
      type: String,
      require: true,
    },
    tenant: {
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
        name: "tenants",
      });
    },
    execUser() {
      if (this.execType == "create" && this.tenant.name != "") {
        this.$store.dispatch("createTenant", this.tenant);
        this.$router.push({
          name: "tenants",
        });
      } else if (this.execType == "update") {
        this.$store.dispatch("updateTenant", this.tenant);
        this.$router.push({
          name: "tenants",
        });
      }
    },
  },
};
</script>