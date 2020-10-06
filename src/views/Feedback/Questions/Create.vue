<template>
  <div>
    <h1 class="view-title">
      Vraag aanmaken
    </h1>

    <div class="card">
      <div class="card-body">
        <div class="form-group">
          <label
            for=""
          >Vraag</label>
          <input
            v-model="feedback.question"
            type="text"
            class="form-control"
          >
        </div>

        <div
          v-for="(answer,index) in feedback.answers"
          :key="index"
          class="form-group"
        >
          <label
            for=""
            class=""
          >Antwoord {{ index + 1 }}</label>
          <div class="input-group">
            <input
              v-model="feedback.answers[index].answer"
              type="text"
              class="form-control"
            >
            <div class="input-group-append">
              <button
                class="btn btn-secondary input-group-button"
                title="Antwoord verwijderen"
                @click="removeAnswer(index)"
              >
                <span><font-awesome-icon icon="trash" /></span>
              </button>
            </div>
          </div>
        </div>

        <div class="form-group mt-25">
          <label for="">Antwoord toevoegen</label>
          <div class="input-group">
            <input
              v-model="answer"
              type="text"
              class="form-control"
            >
            <div class="input-group-append">
              <button
                class="btn btn-primary input-group-button"
                title="Antwoord toevoegen"
                @click="addAnswer"
              >
                <div class="d-flex">
                  <div class="mr-5">
                    <font-awesome-icon icon="plus" />
                  </div>
                  Toevoegen
                </div>
              </button>
            </div>
          </div>
        </div>

        <div class="form-group mt-25">
          <button
            class="btn btn-primary"
            @click="createQuestion"
          >
            <div class="d-flex">
              Vraag aanmaken
              <div class="ml-5">
                <font-awesome-icon icon="angle-right" />
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { AnswerModel } from '@/classes/feedback/answer/answer.model'
import { FeedbackModel } from '@/classes/feedback/feedback.model'
import FeedbackService from '@/classes/feedback/feedback.service'

export default {
  name: 'Create',
  data () {
    return {
      feedback: {},
      answer: ''
    }
  },
  created () {
    this.feedback = new FeedbackModel();
  },
  methods: {
    addAnswer () {
      if (this.answer !== '') {
        this.feedback.answers.push(new AnswerModel(this.answer))
        this.answer = ''
      }
    },

    /**
     *
     * @param index {number}
     */
    removeAnswer (index) {
      this.feedback.answers.splice(index, 1)
    },

    createQuestion () {
      FeedbackService.store(this.feedback)
          .then(() => {
            this.$router.push('/feedback')
          })
    }
  }
}
</script>

<style scoped>

</style>
