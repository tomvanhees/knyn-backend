<template>
    <div>
        <h1>Feedback</h1>

        <div class="container">
            <div class="row">
                <div class="col-8 offset-2">
                    <div class="card">
                        <div class="card-header">
                            <div class="card-header-text">Vragen</div>
                        </div>

                        <ul class="list-group list-group-flush">
                            <li class="list-group-item" :key="question.question" v-for="question in questions">{{ question.question}}</li>


                            <li class="list-group-item">
                                <div class="d-flex justify-content-center ">
                                    <router-link :to="`/feedback/create`">
                                        <div class="small-add-button">
                                            <span>+</span>
                                        </div>
                                    </router-link>
                                </div>
                            </li>

                        </ul>

                        <div class="row pt-3 my-3">
                            <div class="col-6 d-flex justify-content-center">
                                <button class="btn  btn-outline-primary">Bekijk antwoorden</button>
                            </div>
                            <div class="col-6 d-flex justify-content-center">
                                <router-link tag="button" to="/statistics" class="btn btn-outline-primary">Bekijk statistieken</router-link>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import http from "../../http/http";

    export default {
        name   : "Index",
        data() {
            return {
                questions: []
            }
        },
        methods: {
            getQuestions() {
                http.get("/feedback/questions").then(response => {
                    this.questions = response.data;
                })
            }
        },


        created() {
            this.getQuestions();
        }
    }
</script>

<style scoped>

</style>