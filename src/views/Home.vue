<template>
  <v-app>
    <AppBar></AppBar>
    <v-main>
      <v-container fluid>
        <!-- 選択 -->
        <v-row align="center" justify="center">
          <v-col cols="11" sm="5">
            <v-select
              v-model="e7"
              :items="tenants"
              label="Select"
              multiple
              chips
              hint="What are the target regions"
              persistent-hint
            ></v-select>
          </v-col>
          <!-- Start date picker -->
          <v-col cols="11" sm="2">
            <v-menu
              ref="startMenu"
              v-model="startMenu"
              :close-on-content-click="false"
              :return-value.sync="startDate"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="startDate"
                  label="start date"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="startDate" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="startMenu = false">
                  Cancel
                </v-btn>
                <v-btn
                  text
                  color="primary"
                  @click="$refs.startMenu.save(startDate)"
                >
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>
          <!-- End date picker -->
          <v-col cols="11" sm="2">
            <v-menu
              ref="endMenu"
              v-model="endMenu"
              :close-on-content-click="false"
              :return-value.sync="endDate"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="endDate"
                  label="end date"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="endDate" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="endMenu = false">
                  Cancel
                </v-btn>
                <v-btn
                  text
                  color="primary"
                  @click="$refs.endMenu.save(endDate)"
                >
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>
          <!-- 参照ボタン -->
          <v-col cols="11" sm="1" @click="onRefer">
            <v-btn color="primary"> Refer </v-btn>
          </v-col>
        </v-row>

        <!-- テーブルカード -->
        <v-card class="ma-5">
          <!-- サーチのところ -->
          <v-card-title>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>

          <!-- ダウンロードアイコン -->
          <v-container fluid>
            <v-row align="center" justify="center">
              <v-col align="end">
                <v-btn
                  class="ma-2"
                  text
                  icon
                  color="black lighten-2"
                  @click="onExport"
                >
                  <v-icon large color="black darken-2" dark>
                    mdi-download
                  </v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-container>

          <!-- データテーブル -->
          <v-data-table
            :loading="loading"
            :loading-text="loadingText"
            :headers="headers"
            :items="desserts"
            :search="search"
          ></v-data-table>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import XLSX from "xlsx";
import _ from "lodash";

import AppBar from "@/components/AppBar.vue";

export default {
  data() {
    return {
      loading: false,
      loadingText: "",
      startDate: new Date().toISOString().substr(0, 10),
      endDate: new Date().toISOString().substr(0, 10),
      startMenu: false,
      endMenu: false,
      e7: [],
      tenants: [],
      search: "",
      headers: [
        {
          text: "Dessert (100g serving)",
          align: "start",
          sortable: true,
          value: "name",
        },
        { text: "Calories", value: "calories" },
        { text: "Fat (g)", value: "fat" },
        { text: "Carbs (g)", value: "carbs" },
        { text: "Protein (g)", value: "protein" },
        { text: "Iron (%)", value: "iron" },
      ],
      desserts: [],
    };
  },
  components: { AppBar },
  created() {
    this.tenants = this.$store.getters.me.tenants;
  },
  methods: {
    onRefer() {
      const sleep = (time) =>
        new Promise((resolve) => setTimeout(resolve, time));
      this.loading = true;
      this.loadingText = "Loading... Please wait";
      sleep(3000).then(() => {
        this.$store.dispatch("getDesserts");
        this.loading = false;
        this.loadingText = "";
        this.desserts = this.$store.getters.desserts;
      });
    },
    onExport() {
      const header = this.headers.map((h) => [h.value, h.text]);
      const convHeader = _.fromPairs(header);
      const data = this.desserts.map((e) =>
        _.mapKeys(e, (v, k) => convHeader[k])
      );
      console.log(data);
      const dataWS = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, dataWS, "data");
      XLSX.writeFile(wb, "filename.csv");
    },
  },
};
</script>