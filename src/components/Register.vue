<template>
  <v-container fluid>
    <h1>{{ title }}</h1>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      User: [{}, { title: "hogehoge", type: "checkbox", admin: false }],
    };
  },
};
</script>