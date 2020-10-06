<template>
  <div class="answer-card">
    <div class="card-body">
      <div
        v-for="(feedbackItem,index) in feedback.items"
        :key="index"
      >
        <div class="question">
          {{ feedbackItem.question }}
        </div>
        <div class="answer">
          <span>   <font-awesome-icon icon="angle-right" /></span>   {{ feedbackItem.answer }}
        </div>
      </div>


      <footer>
        Ingevuld op {{ feedback.date }}
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AnswerCard',
  props: {
    feedback: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
