<template>
  <div>
    <div class="container">
      <div class="row">
        <div
          v-for="statistic in this.statistics"
          :key="statistic.id"
          class="col-4 mb-3"
        >
          <div class="card">
            <div class="card-header">
              <div class="card-header-text">
                {{ statistic.question }}
              </div>
            </div>

            <div class="card-body">
              <doughnut-chart
                :chartdata="statistic.data"
                :options="options"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    // import Vue from "vue";
    // import Component from "vue-class-component";
    // import http from "../../http/http";
    // import DoughnutChart from "@/components/Statistics/DoughnutChart.vue";
    //
    // @Component({
    //     components: {
    //         DoughnutChart
    //     }
    // })
    // export default class StatisticsIndex extends Vue {
    //     statistics: Array<any> = [];
    //     options = {
    //         legend: {
    //             display: true,
    //             position: 'bottom',
    //             align: 'center'
    //         }
    //     };
    //
    //     getStatistics(): void {
    //         http.get("/statistics").then(response => {
    //             this.statistics = response.data;
    //         })
    //     }
    //
    //     created(): void {
    //         this.getStatistics();
    //     }
    // }
</script>

<style scoped>

</style>
