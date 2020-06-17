import {Model} from "@/classes/Model";
import {FeedbackResponseInterface} from "@/classes/feedback/response/feedback-response.interface";

export class FeedbackResponseModel extends Model implements FeedbackResponseInterface {
    answer = "";
    question = "";
}
