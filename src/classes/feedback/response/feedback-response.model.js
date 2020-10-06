export class FeedbackResponseModel {

    answer = "";
    question = "";

    serialize() {
        return {
            'answer': this.answer,
            'question': this.question
        }
    }
}
