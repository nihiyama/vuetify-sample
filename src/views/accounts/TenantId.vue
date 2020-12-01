<template>
  <v-app>
    <AppBar></AppBar>
    <v-main>
      <TenantForm
        :title="title"
        :tenant="tenant"
        :execType="'update'"
      ></TenantForm>
    </v-main>
  </v-app>
</template>

<script>
import AppBar from "@/components/AppBar.vue";
import TenantForm from "@/components/TenantForm.vue";

export default {
  data: () => ({
    title: "Edit Tenant",
    tenant: {
      id: null,
      name: "",
    },
  }),
  created() {
    const id = this.$route.params["id"];
    this.$store.dispatch("getTenant", id).then(() => {
      const name = this.$store.getters.tenant.name;
      this.tenant = {
        ...this.$store.getters.tenant,
        name: name,
      };
    });
  },
  components: {
    AppBar,
    TenantForm,
  },
};
</script>