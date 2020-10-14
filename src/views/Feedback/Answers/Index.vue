<template>
  <div>
    <view-title title="Antwoorden" />

    <div class="answers-container">
      <div
        v-for="(clients, name,index) in answers"
        :key="index"
      >
        <div class="answer-container">
          <div class="date">
            <h2>{{ name }}</h2>
          </div>
          <div>
            <div
              v-for="(feedback,client_id) in clients"
              :key="client_id"
            >
              <answer-card :feedback="feedback" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ViewTitle from '@/components/layout/ViewTitle'
import AnswerCard from '@/components/Feedback/Answers/AnswerCard'
import { AnswerService } from '@/classes/feedback/answer/answer.service'

export default {
  name: 'Index',
  components: {
    ViewTitle,
    AnswerCard
  },
  data () {
    return {
      answers: [],
    }
  },

  created () {
    this.fetch()
  },
  methods: {
    async fetch () {
      const response = await AnswerService.fetch()
      this.answers = response.data.content
    }
  }
}
</script>

<style lang="scss" scoped>
.answers-container {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 15px;

  .answer-container {
    display: grid;
    grid-template-columns: 200px 1fr;
    position: relative;

    .date {
      position: relative;
      width: 200px;
      h2{
        position: sticky;
        top:0
      }
    }
  }
}
</style>
