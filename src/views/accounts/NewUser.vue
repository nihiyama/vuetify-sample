<template>
  <v-app>
    <AppBar></AppBar>
    <v-main>
      <UserForm :title="title" :user="user" :execType="'create'"></UserForm>
    </v-main>
  </v-app>
</template>

<script>
import AppBar from "@/components/AppBar.vue";
import UserForm from "@/components/UserForm.vue";

export default {
  data: () => ({
    title: "NewUser",
    user: {
      name: "",
      password: "",
      isSuperuser: false,
      tenantNames: [],
    },
  }),
  components: {
    AppBar,
    UserForm,
  },
};
</script>