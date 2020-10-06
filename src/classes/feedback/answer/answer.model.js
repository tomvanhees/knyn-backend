
export class AnswerModel {

    answer = "";

    constructor(answer) {
        this.answer = answer;
    }

    serialize() {
        return {
            'answer': this.answer
        }
    }
}
