<template>
  <v-app-bar app color="primary" dark>
    <div class="d-flex align-center">
      <v-img
        alt="Vuetify Logo"
        class="shrink mr-2"
        contain
        src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
        transition="scale-transition"
        width="40"
      />
      <span class="font-weight-medium text-h4 pl-5">HogeHoge</span>
    </div>

    <v-spacer></v-spacer>

    <span class="pr-2 text-h5">User: </span>

    <template v-slot:extension>
      <v-btn text large color="white" @click="toHome"> Home </v-btn>
      <v-menu transition="slide-y-transition" bottom offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn text large color="white" v-bind="attrs" v-on="on">
            Administration
          </v-btn>
        </template>
        <v-list dense nav>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-subtitle v-html="'User'"></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            link
            @click="toItems(item.viewName)"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list dense nav>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-subtitle v-html="'Admin'"></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            v-for="(item, i) in adminItems"
            :key="i"
            link
            @click="toAdminItems(item.viewName)"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>
  </v-app-bar>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    items: [{ title: "Change Password", viewName: "user-id" }],
    adminItems: [
      { title: "User Administoration", viewName: "users" },
      { title: "Tenant Administoration", viewName: "tenants" },
    ],
  }),

  methods: {
    toHome() {
      this.$router.push({
        name: "home",
      });
    },
    toItems(viewName) {
      this.$router.push({
        name: viewName,
        params: { id: 1 },
      });
    },
    toAdminItems(viewName) {
      this.$router.push({
        name: viewName,
      });
    },
  },
};
</script>