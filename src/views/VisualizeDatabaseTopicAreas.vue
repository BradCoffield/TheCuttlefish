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
              label: ["Excellent For"],
              backgroundColor:     "#0f52ba",
              data: []
            },
            { label: ["Good For"], data: [], backgroundColor: "#4f97a3" }
          ]
        },
        options: {
      legend: {  },
      tooltips: {
        mode: 'index',
        intersect: false
      },
      responsive: true,
      scales: {
        xAxes: [{
          stacked: true,
        }],
        yAxes: [{
          stacked: true
        }]
      }
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
            this.topicAreasCounter.push({
              name: tt,
              excellentFor: 0,
              goodFor: 0
            }); //this builds a new array of objects with the topic areas and counters for possibilities. This will get modified based on our real data and then used to populate our chart. Hopefully.
          });
        });
        this.rawDatabasesData.forEach(db => {
          if (db.excellentFor) {
            db.excellentFor.forEach(efi => {
              this.topicAreasCounter.forEach(ta => {
                if (ta.name == efi) {
                  ta.excellentFor++;
                }
              });
            });
          }
          if (db.goodFor) {
            db.goodFor.forEach(gfi => {
              this.topicAreasCounter.forEach(ta => {
                if (ta.name == gfi) {
                  ta.goodFor++;
                }
              });
            });
          }
        });
        this.addDataAndLabels("hi");
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
    addDataAndLabels() {
      this.topicAreasCounter.forEach(tt => {
        this.chartData.data.labels.push(tt.name);
        this.chartData.data.datasets[0].data.push(tt.excellentFor);
        this.chartData.data.datasets[1].data.push(tt.goodFor);
      });
      this.createChart("database-topic-areas-viz", this.chartData)
    }
  }
};
</script>

<style>
</style>