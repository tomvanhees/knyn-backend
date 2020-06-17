import {FeedbackInterface} from "@/classes/feedback/feedback.interface";
import {AnswerInterface} from "@/classes/feedback/answer/answer.interface";
import {Model} from "@/classes/Model";

export class FeedbackModel extends Model implements FeedbackInterface {
    answers: Array<AnswerInterface> = [];
    question = "";

    // serialize(): any {
    //     return {
    //         question: this.question,
    //         answers: this.answers
    //     }
    // }
}
