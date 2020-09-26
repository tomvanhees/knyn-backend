<template>
  <div>
    <h1>Feedback</h1>

    <div class="container">
      <div class="row">
        <div class="col-8 offset-2">
          <div class="card">
            <div class="card-header">
              <div class="card-header-text">
                Vragen
              </div>
            </div>

            <ul class="list-group list-group-flush">
              <li
                v-for="question in questions"
                :key="question.question"
                class="list-group-item"
              >
                {{
                  question.question }}
              </li>


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
                <router-link
                  tag="button"
                  to="/feedback/answers"
                  class="btn btn-outline-primary"
                >
                  Bekijk
                  antwoorden
                </router-link>
              </div>
              <div class="col-6 d-flex justify-content-center">
                <router-link
                  tag="button"
                  to="/statistics"
                  class="btn btn-outline-primary"
                >
                  Bekijk
                  statistieken
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
    import FeedbackService from "@/classes/feedback/feedback.service";
    import {FeedbackModel} from "@/classes/feedback/feedback.model";


    @Component
    export default class Index extends Vue {
        questions: Array<any> = []

        getQuestions(): void {
            FeedbackService.fetch().
            then(response => {
                this.questions = response.data.map((feedback: any) => new FeedbackModel().deserialize(feedback));
            })
        }

        created(): void {
            this.getQuestions();
        }
    }
</script>

<style scoped>

</style>
