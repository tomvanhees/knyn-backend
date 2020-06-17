import {AnswerInterface} from "@/classes/feedback/answer/answer.interface";
import {Model} from "@/classes/Model";

export class AnswerModel extends Model implements AnswerInterface {
    answer = "";
    id: number = Date.now();

    constructor(id: number = Date.now()) {
        super();
        this.id = id;
    }

}
