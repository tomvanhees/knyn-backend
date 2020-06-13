<template>
    <div>
        <h1>Feedback</h1>

        <div class="container">
            <div class="row">
                <div class="col-8 offset-2">
                    <div
                            v-for="(answerObject, date) in answersCollection"
                            :key="`answer_${date}`"
                            class="card mb-3 pb-4"
                    >
                        <div class="card-header">
                            <div class="card-header-text">
                                {{ date }}
                            </div>
                        </div>
                        <ul class="list-group list-group-flush">
                            <li
                                    v-for="(answers, id) in answerObject"
                                    :key="`${date}_${id}`"
                                    class="list-group-item"
                            >
                                <div
                                        v-for="(answer, index) in answers"
                                        :key="`${date}_${id}_${index}`"
                                >
                                    <div class="font-weight-bold">
                                        {{ answer.question }}
                                    </div>
                                    <div>{{ answer.answer }}</div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import http from "../../../http/http";
    import {AnswerInterface} from "@/interfaces/AnswerInterface";

    @Component
    export default class AnswersIndex extends Vue {
        answersCollection: Array<AnswerInterface> = []

        created(): void {
            this.getAnswers();
        }

        getAnswers(): void {
            http.get("/feedback/answers").then(response => {
                this.answersCollection = response.data
            })
        }
    }
</script>

<style scoped>

</style>
