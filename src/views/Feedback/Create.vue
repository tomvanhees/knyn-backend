<template>
    <div>
        <h1>Vraag aanmaken</h1>

        <div class="container">
            <div class="row">
                <div class="col-8 offset-2">
                    <div class="card">
                        <div class="card-body">

                            <div class="form-group row">
                                <label for="" class="col-3">Vraag</label>
                                <div class="col-9">
                                    <input type="text" class="form-control" v-model="feedback.question">
                                </div>
                            </div>

                            <div class="form-group row" :key="index" v-for="(answer,index) in feedback.answers">
                                <label for="" class="col-2 offset-1">Antwoord {{ index + 1 }}</label>
                                <div class="col-8">
                                    <input type="text" class="form-control" v-model="feedback.answers[index].answer">
                                </div>

                                <div class="col-1">
                                    <button class="btn btn-outline-delete btn-sm" @click="removeAnswer(index)">
                                        <span>x</span></button>
                                </div>
                            </div>

                            <div class="form-group d-flex justify-content-center">

                                <div class="small-add-button" @click="addAnswer">
                                    <span>+</span>
                                </div>
                            </div>

                            <div class="form-group d-flex justify-content-between">
                                <button class="btn btn-outline-primary" @click="createQuestion">Aanmaken</button>
                                <router-link tag="button" class="btn btn-outline-primary" to="/feedback">Annuleren
                                </router-link>
                            </div>
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

    @Component
    export default class Create extends Vue {
        feedback = {
            question: "",
            answers: [],
        }

        addAnswer(): void {
            this.feedback.answers.push({
                id: Date.now(),
                answer: ""
            });
        }

        removeAnswer(index): void {
            this.feedback.answers.splice(index, 1)
        }

        createQuestion(): void {
            http.post("/feedback/questions", {
                question: this.feedback.question,
                answers: this.feedback.answers
            }).then(() => {
                this.$router.push("/feedback");
            })
        }
    }
</script>

<style scoped>

</style>
