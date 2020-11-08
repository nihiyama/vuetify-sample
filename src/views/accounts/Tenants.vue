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
        { text: "Tenant Name", value: "tenantName" },
        { text: "Updated at", value: "updatedAt" },
        { text: "Operations", value: "operations" },
      ],
      datas: [
        {
          id: 1,
          tenantName: "hogehoge",
          updatedAt: "2020/10/29",
        },
        {
          id: 2,
          tenantName: "fugafuga",
          updatedAt: "2020/10/29",
        },
        {
          id: 3,
          tenantName: "foo",
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