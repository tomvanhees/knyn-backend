<template>
  <div>
    <view-title title="Feedback">
      <div class="d-flex">
        <header-button
          to="/feedback/answers"
          text="Bekijk
          antwoorden"
          class="mr-10"
        />

        <create-new-button
          to="/feedback/create"
          text="Vraag toevoegen"
        />
      </div>
    </view-title>

    <ul class="list-group">
      <li
        v-for="(question,index) in questions"
        :key="question.question"
        class="list-group-item mb-5"
      >
        <div class="answer-card">
          <div class="card-body d-flex justify-space-between">
            <div>
              <div class="question">
                {{ question.question }}
              </div>
              <div
                v-for="answer in question.answers"
                :key="answer.id"
                class="answer"
              >
                <span><font-awesome-icon icon="angle-right" /></span>    {{ answer.answer }}
              </div>
            </div>
            <div class="d-flex">
              <div class="mr-5">
                <button
                  class="btn btn-sm "
                  :class="[question.isActive ?'btn-primary' : 'btn-secondary']"
                  @click="toggleQuestionActive(index)"
                >
                  <div v-if="question.isActive">
                    Actief<span><font-awesome-icon icon="check" /></span>
                  </div>
                  <div v-else>
                    Niet actief <span><font-awesome-icon icon="circle" /></span>
                  </div>
                </button>
              </div>
              <div>
                <button
                  class="btn btn-sm btn-danger"
                  @click="deleteQuestion(index)"
                >
                  <span><font-awesome-icon icon="trash" /></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import FeedbackService from '@/classes/feedback/feedback.service'
import CreateNewButton from '@/components/Buttons/CreateNewHeaderButton.vue'
import HeaderButton from '@/components/Buttons/HeaderButton'
import ViewTitle from '@/components/layout/ViewTitle'
export default {
  name: 'Index',
  components: {
    CreateNewButton,
    HeaderButton,
    ViewTitle
  },
  data () {
    return {
      questions: []
    }
  },
  created () {
    this.getQuestions()
  },
  methods: {
    /**
     * Fetches questions from api
     * @return void
     * */
    async getQuestions () {
      const response = await FeedbackService.fetch()
      this.questions = await FeedbackService.deserializeCollection(response)
    },

    /**
     * Delete question
     * @param index {number}
     * @return void
     * */
    deleteQuestion (index) {
      if (confirm('Ben je zeker dat je deze vraag wilt verwijderen?')) {

        FeedbackService
            .delete(this.findModel(index))
            .then(() => {
              this.questions.splice(index, 1)
            })
      }
    },
    /**
     * Toggle a question active or inactive
     * @param index {number}
     * @return void
     */
    toggleQuestionActive (index) {
      FeedbackService
          .toggle(this.findModel(index))
          .then(() => {
            this.questions[index].isActive = !this.questions[index].isActive
          })
    },

    /**
     *  Find model in array
     * @param index {number}
     * @return FeedbackModel
     */
    findModel (index) {
      return this.questions[index]
    }
  }
}
</script>

<style scoped>

</style>
