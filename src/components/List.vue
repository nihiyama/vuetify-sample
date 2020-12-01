<template>
  <v-container fluid>
    <h1>{{ title }}</h1>
    <template>
      <v-dialog v-model="dialogDelete" persistent max-width="290">
        <v-card>
          <v-card-title class="headline">
            Delete this {{ title }}?
          </v-card-title>
          <v-card-text>
            ID: {{ deleteData.id }} <br />
            Name: {{ deleteData.name }}
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="gray darken-1" @click="closeDelete" text>
              Cancel
            </v-btn>
            <v-btn color="red darken-1" @click="deleteExec(deleteAction)" text>
              Delete
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>

    <!-- テーブルカード -->
    <v-card class="ma-5">
      <v-container fluid>
        <v-row align="center" justify="center">
          <v-col align="end">
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-col>
          <v-col align="end">
            <v-btn color="primary" @click="toNew"> Add </v-btn>
          </v-col>
        </v-row>
      </v-container>

      <!-- データテーブル -->
      <v-data-table :headers="headers" :items="datas" :search="search">
        <template v-slot:[`item.tenants`]="{ item }">
          <v-chip
            class="ma-1"
            small
            v-for="tenant in item.tenants"
            :key="tenant"
          >
            {{ tenant }}
          </v-chip>
        </template>

        <template v-slot:[`item.operations`]="{ item }">
          <v-icon class="mr-2" @click="toEdit(item)"> mdi-pencil </v-icon>
          <v-icon class="mr-2" @click="deleteItem(item)"> mdi-delete </v-icon>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    search: "",
    dialogDelete: false,
    deleteData: {
      id: null,
      name: "",
    },
  }),
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
    deleteAction: {
      type: String,
      required: true,
    },
  },
  watch: {
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  methods: {
    deleteItem(item) {
      this.deleteData = {
        id: item.id,
        name: item.name,
      };
      this.dialogDelete = true;
    },
    closeDelete() {
      this.dialogDelete = false;
    },
    deleteExec(deleteAction) {
      this.$store.dispatch(`${deleteAction}`, this.deleteData.id);
      this.closeDelete();
    },
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