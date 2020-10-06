export class FeedbackModel {
  id
  isActive = true
  answers = []
  question = ''

  deserialize (input) {
    this.id = input.id
    this.isActive = input.is_active
    this.answers = input.answers
    this.question = input.question
    return this
  }

  /**
   * @return {{is_active: boolean, question: string, answers: [], id: number}}
   */
  serialize () {
    return {
      'id': this.id,
      'question': this.question,
      'answers': this.answers,
      'is_active': this.isActive
    }
  }
}
