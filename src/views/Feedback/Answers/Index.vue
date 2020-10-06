<template>
  <div>
    <view-title title="Antwoorden" />

    <div class="answers-container">
      <div
        v-for="(feedback,index) in answers"
        :key="index"
      >
        <answer-card :feedback="feedback" />
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

<style scoped>
.answers-container{
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 15px;
}
</style>
