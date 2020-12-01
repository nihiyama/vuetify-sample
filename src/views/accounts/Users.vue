<template>
  <v-app>
    <AppBar></AppBar>
    <v-main>
      <List
        :title="'User'"
        :headers="headers"
        :datas="datas"
        :newPage="'new-user'"
        :editPage="'user-id'"
        :deleteAction="'deleteUser'"
      ></List>
    </v-main>
  </v-app>
</template>

<script>
import AppBar from "@/components/AppBar.vue";
import List from "@/components/List.vue";

export default {
  data: () => ({
    headers: [
      { text: "ID", value: "id" },
      { text: "User", value: "name" },
      { text: "Superuser", value: "isSuperuser" },
      { text: "Tenants", value: "tenants" },
      { text: "Operations", value: "operations" },
    ],
    datas: [],
  }),
  components: {
    AppBar,
    List,
  },
  created() {
    this.$store.dispatch("getUsers").then(() => {
      this.datas = this.$store.getters.users;
    });
  },
  mounted() {
    this.$store.watch(
      (state, getters) => getters.users,
      (newVal) => {
        this.datas = newVal;
      }
    );
  },
};
</script>