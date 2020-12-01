<template>
  <v-app-bar app color="primary" dark>
    <div class="d-flex align-center">
      <v-img
        alt="Vuetify Logo"
        class="shrink mr-2"
        contain
        transition="false"
        :src="require('../assets/vuetify-logo-dark.png')"
        width="40"
      />
      <span class="font-weight-medium text-h4 pl-5">HogeHoge</span>
    </div>

    <v-spacer></v-spacer>

    <v-menu transition="slide-y-transition" bottom offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="text-none"
          text
          large
          color="white"
          v-bind="attrs"
          v-on="on"
        >
          {{ me.name }}
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
      <v-list dense nav v-if="me.isSuperuser">
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
  </v-app-bar>
</template>

<script>
export default {
  name: "AppBar",

  data: () => ({
    me: {},
    items: [
      { title: "To Home", viewName: "home" },
      { title: "Change Password", viewName: "user-me" },
      { title: "Logout", viewName: "login" },
    ],
    adminItems: [
      { title: "User Administoration", viewName: "users" },
      { title: "Tenant Administoration", viewName: "tenants" },
    ],
  }),
  created() {
    this.me = this.$store.getters.me;
  },
  methods: {
    toHome() {
      console.log(this.$router.path);
      if (this.$router.path != this.$router.resolve({ name: "home" }.href)) {
        this.$router.push({
          name: "home",
        });
      }
    },
    toItems(viewName) {
      if (viewName == "login") {
        this.$store.dispatch("logout");
      } else {
        if (this.$route.name != viewName) {
          this.$router.push({
            name: viewName,
            params: { id: 1 },
          });
        }
      }
    },
    toAdminItems(viewName) {
      if (this.$route.name != viewName) {
        this.$router.push({
          name: viewName,
        });
      }
    },
  },
};
</script>