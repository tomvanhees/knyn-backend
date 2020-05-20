<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col-6" :key="statistic.id" v-for="statistic in this.statistics">
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

<script>
    import http from "../../http/http";
    import DoughnutChart from "../../components/Statistics/DoughnutChart";

    export default {
        name: "StatisticsIndex",

        components: {
            DoughnutChart
        },
        data() {
            return {
                statistics: [],
                options:{
                    legend:{
                        position: 'right',
                        align: 'start'
                    }
                }
            }
        },
        methods   : {
            getStatistics() {
                http.get("/statistics").then(response => {
                    this.statistics = response.data;
                })
            },
        },
        created() {
            this.getStatistics();
        }
    }
</script>

<style scoped>

</style>