import http from "@/http/http";
import {FeedbackModel} from "@/classes/feedback/feedback.model";

export default class FeedbackService {
    static fetch(): Promise<any> {
        return http.get("/feedback/questions");
    }

    static store(feedbackModel: FeedbackModel): Promise<any> {
        return http.post("/feedback/questions",
            {
                content: feedbackModel.serialize()
            })
    }
}
