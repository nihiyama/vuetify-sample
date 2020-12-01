<template>
  <v-app>
    <AppBar></AppBar>
    <v-main>
      <TenantForm
        :title="title"
        :tenant="tenant"
        :execType="'create'"
      ></TenantForm>
    </v-main>
  </v-app>
</template>

<script>
import AppBar from "@/components/AppBar.vue";
import TenantForm from "@/components/TenantForm.vue";

export default {
  data: () => ({
    title: "NewTenant",
    tenant: {
      name: "",
    },
  }),
  components: {
    AppBar,
    TenantForm,
  },
};
</script>