<template>
  <v-app>
    <AppBar></AppBar>
    <v-main>
      <UserForm :title="title" :user="user" :execType="'update'"></UserForm>
    </v-main>
  </v-app>
</template>

<script>
import AppBar from "@/components/AppBar.vue";
import UserForm from "@/components/UserForm.vue";

export default {
  data: () => ({
    title: "Edit User",
    user: {
      id: null,
      name: "",
      password: null,
      isSuperuser: false,
      tenantNames: [],
    },
  }),
  created() {
    const id = this.$route.params["id"];
    this.$store.dispatch("getUser", id).then(() => {
      const name = this.$store.getters.user.name;
      const tenantNames = this.$store.getters.user.tenants;
      const isSuperuser = this.$store.getters.user.isSuperuser;
      this.user = {
        ...this.$store.getters.user,
        name: name,
        password: null,
        tenantNames: tenantNames,
        isSuperuser: isSuperuser,
      };
    });
  },
  components: {
    AppBar,
    UserForm,
  },
};
</script>