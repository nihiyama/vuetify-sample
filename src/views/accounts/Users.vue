<template>
  <v-app>
    <AppBar></AppBar>
    <v-main>
      <h1>Users</h1>
    </v-main>
  </v-app>
</template>

<script>
import AppBar from "@/components/AppBar.vue";

export default {
  components: {
    AppBar,
  },
};
</script>