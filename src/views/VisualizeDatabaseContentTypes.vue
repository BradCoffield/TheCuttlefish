<template>
  <div class="container">
    <h2 class="title">Databases by Content Types</h2>
    <canvas id="database-content-types-viz"></canvas>
  </div>
</template>

<script>
import firebase from "../Firebase";
import router from "../router";
import Chart from "chart.js";

export default {
  data() {
    name: "visualizeDatabaseContentTypes";
    return {
      contentTypesRef: firebase.firestore().collection("content-types"),
      databasesRef: firebase.firestore().collection("databases"),
      contentTypes: [],
      contentTypesCounter: [],
      rawDatabasesData: [],
      chartData: {
        type: "bar",
        data: {
          labels: [],
          datasets: [
            {
              data: [],
              backgroundColor: [
                "rgba(255, 99, 132, 1)",
                "#4e79a7",
                "#ffbe7d",
                "#8cd17d",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
                "#a0cbe8",
                "#f28e2b",
                "#fabfd2"
              ]
            }
          ]
        }, options: {
        responsive: true,
        legend: { display: false }
      }
      },
     
    };
  },
  created() {
    this.databasesRef.get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        this.rawDatabasesData.push(doc.data());
      });
      // console.log("rawdb", this.rawDatabasesData);
    });
    this.contentTypesRef.get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        let ourData = doc.data().forDatabases;
        let contentTypes = this.contentTypes;
        let contentTypesCounter = this.contentTypesCounter;

        console.log(ourData);
        ourData.forEach(function(i) {
          contentTypes.push(i);
          contentTypesCounter.push({ [i]: 0 });
        });
        this.rawDatabasesData.forEach(rr => {
          rr.content_types.forEach(ii => {
            contentTypesCounter.forEach(params => {
              if (params.hasOwnProperty(ii)) params[ii]++;
            });
          });
        });
        this.addLabels(this.contentTypes);
        this.addData(this.contentTypesCounter);
        // this.createChart("database-content-types-viz", this.chartData);
      });
    });
  },
  methods: {
    createChart(chartId, chartData) {
      const ctx = document.getElementById(chartId);
      const myChart = new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options
      });
    },
    addLabels(labelData) {
      let chartData = this.chartData;
      labelData.forEach(i => {
        chartData.data.labels.push(i);
      });
    },
    addData(datum) {
      // console.log(datum);
      let chartData = this.chartData;
      datum.forEach(tt => {
        let madValue = Object.values(tt);
        chartData.data.datasets[0].data.push(madValue[0]);
      });
      console.log("sup", chartData);
      this.createChart("database-content-types-viz", this.chartData);
    }
  },
  mounted() {
    // this.createChart("database-content-types-viz", this.chartData);
  }
};
</script>

<style>
</style>