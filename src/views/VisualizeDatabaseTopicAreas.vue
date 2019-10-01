<template>
  <div class="container">
    <h2 class="title">Databases by Topic Areas</h2>
    <canvas id="database-topic-areas-viz"></canvas>
  </div>
</template>

<script>
import firebase from "../Firebase";
import router from "../router";
import Chart from "chart.js";

export default {
  data() {
    name: "visualizeDatabaseTopicAreas";
    return {
      topicAreasRef: firebase.firestore().collection("topic-areas"),
      databasesRef: firebase.firestore().collection("databases"),
      broadTopics: [],
      topicAreas: [],
      topicAreasCounter: [],
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
        },
        options: {
          responsive: true,
          legend: { display: false }
        }
      }
    };
  },
  created() {
    this.databasesRef.get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        this.rawDatabasesData.push(doc.data());
      });
      // console.log("rawdb", this.rawDatabasesData);
    });

    this.topicAreasRef.get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        let theData = doc.data();
        this.broadTopics.push(Object.keys(theData)); //creates an array of strings with top level areas, like Humanities
           this.broadTopics[0].forEach(top => {
        console.log(top);
        // console.log(theData[top]);
        theData[top].forEach(params => {
          this.topicAreas.push(params);
        }); //this uses those top-level areas to get the individual topic areas and push them all into a new, flat array
         this.topicAreas.forEach(tt => {
        this.topicAreasCounter.push({ name: tt, excellentFor: 0, goodFor: 0 }); //this builds a new array of objects with the topic areas and counters for possibilities. This will get modified based on our real data and then used to populate our chart. Hopefully.
      });
      });
      });
    });
    // .then(function() {
    //   rawDatabasesData.forEach(rr => {
    //     rr.content_types.forEach(ii => {
    //       contentTypesCounter.forEach(params => {
    //         if (params.hasOwnProperty(ii)) params[ii]++;
    //       });
    //     });
    //   });
    // });
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
        chartData.datasets[0].data.push(madValue[0]);
      });
      this.createChart("database-topic-areas-viz", this.chartData);
    }
  }
};
</script>

<style>
</style>