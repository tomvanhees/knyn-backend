<template>
    <div>
        <h1>Feedback</h1>

        <div class="container">
            <div class="row">
                <div class="col-8 offset-2">

                    <div class="card mb-3" :key="`answer_${date}`" v-for="(answerObject, date) in answers">
                        <div class="card-header">
                            <div class="card-header-text">{{ date}}</div>
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item" :key="`${date}_${index}`" v-for="(item, index) in answerObject">
                              <div :key="`${date}_${index}_${index2}`" v-for="(answer,index2) in item.answer">
                                  <div class="font-weight-bold">{{answer.question}}</div>
                                  <div>{{answer.answer}}</div>
                              </div>


                            </li>
                        </ul>
                    </div>
                </div>

            </div>
        </div>

    </div>
</template>

<script>
    import http from "../../../http/http";
    export default {
        name   : "AnswersIndex",
        data() {
            return {
                answers: []
            }
        },
        methods: {
            getAnswers() {
                http.get("/feedback/answers").then(response => {
                    this.answers = response.data
                })
            }
        },
        created() {
            this.getAnswers();
        }
    }
</script>

<style scoped>

</style>