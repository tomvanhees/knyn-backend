<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col-4 mb-3" :key="statistic.id" v-for="statistic in this.statistics">
                    <div class="card">
                        <div class="card-header">
                            <div class="card-header-text">{{ statistic.question}}</div>
                        </div>

                        <div class="card-body">
                            <doughnut-chart :chartdata="statistic.data" :options="options"></doughnut-chart>
                        </div>
                    </div>


                </div>
            </div>
        </div>

    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import http from "../../http/http";
    import DoughnutChart from "@/components/Statistics/DoughnutChart.vue";

    @Component({
        components: {
            DoughnutChart
        }
    })
    export default class StatisticsIndex extends Vue {
        statistics: Array<any> = [];
        options = {
            legend: {
                display: true,
                position: 'bottom',
                align: 'center'
            }
        };

        getStatistics(): void {
            http.get("/statistics").then(response => {
                this.statistics = response.data;
            })
        }

        created(): void {
            this.getStatistics();
        }
    }
</script>

<style scoped>

</style>
