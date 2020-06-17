import {SerializeInterface} from "@/interfaces/Serialize.interface";
import {DeserializableInterface} from "@/interfaces/Deserializable.interface";
import {AnswerInterface} from "@/classes/feedback/answer/answer.interface";

export interface FeedbackInterface extends SerializeInterface, DeserializableInterface {
    question: string;
    answers: Array<AnswerInterface>;
}
