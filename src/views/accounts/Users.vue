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
        { text: "User", value: "user" },
        { text: "Username", value: "username" },
        { text: "Administrator", value: "admin" },
        { text: "Updated at", value: "updatedAt" },
        { text: "Operations", value: "operations" },
      ],
      datas: [
        {
          id: 1,
          user: "hogehoge",
          username: "hogehoge",
          admin: true,
          updatedAt: "2020/10/29",
        },
        {
          id: 2,
          user: "fugafuga",
          username: "fugafuga",
          admin: false,
          updatedAt: "2020/10/29",
        },
        {
          id: 3,
          user: "foo",
          username: "bar",
          admin: false,
          updatedAt: "2020/10/29",
        },
      ],
    };
  },
  components: {
    AppBar,
    List,
  },
};
</script>