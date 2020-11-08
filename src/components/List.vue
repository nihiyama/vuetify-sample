<template>
  <v-container fluid>
    <h1>{{ title }}</h1>

    <!-- テーブルカード -->
    <v-card class="ma-5">
      <v-container fluid>
        <v-row align="center" justify="center">
          <v-col align="end">
            <v-btn color="primary" @click="toNew"> Add </v-btn>
          </v-col>
        </v-row>
      </v-container>

      <!-- データテーブル -->
      <v-data-table :loading="'false'" :headers="headers" :items="datas">
        <template v-slot:[`item.operations`]="{ item }">
          <v-icon class="mr-2" @click="toEdit(item)"> mdi-pencil </v-icon>
          <v-icon class="mr-2" @click="remove(item)"> mdi-delete </v-icon>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    headers: {
      type: Array,
      required: true,
    },
    datas: {
      type: Array,
      required: true,
    },
    newPage: {
      type: String,
      required: true,
    },
    editPage: {
      type: String,
      required: true,
    },
  },
  methods: {
    toNew() {
      this.$router.push({
        name: this.newPage,
      });
    },
    toEdit(item) {
      this.$router.push({
        name: this.editPage,
        params: { id: item.id },
      });
    },
  },
};
</script>