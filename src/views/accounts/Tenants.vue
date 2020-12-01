<template>
  <v-app>
    <AppBar></AppBar>
    <v-main>
      <List
        :title="'Tenant'"
        :headers="headers"
        :datas="datas"
        :newPage="'new-tenant'"
        :editPage="'tenant-id'"
        :deleteAction="'deleteTenant'"
      ></List>
    </v-main>
  </v-app>
</template>

<script>
import AppBar from "@/components/AppBar.vue";
import List from "@/components/List.vue";

export default {
  data() {
    return {
      headers: [
        { text: "ID", value: "id" },
        { text: "Tenant Name", value: "name" },
        { text: "Operations", value: "operations" },
      ],
      datas: [],
    };
  },
  components: {
    AppBar,
    List,
  },
  created() {
    this.$store.dispatch("getTenants").then(() => {
      this.datas = this.$store.getters.tenants;
    });
  },
  mounted() {
    this.$store.watch(
      (state, getters) => getters.tenants,
      (newVal) => {
        this.datas = newVal;
      }
    );
  },
};
</script>