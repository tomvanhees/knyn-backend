import http from '@/http/http'
import { FeedbackModel } from '@/classes/feedback/feedback.model'

export default class FeedbackService {
  static async fetch () {
    return http.get('/feedback/questions')
  }

  static async deserializeCollection (response) {
    if (Array.isArray(response.data['content'])) {
      return response.data['content'].map((feedback) => FeedbackService.deserialize(feedback))
    }
  }

  static deserialize (feedback) {
    return new FeedbackModel().deserialize(feedback)
  }

  /**
   *
   * @param feedbackModel {FeedbackModel}
   * @return {Promise<AxiosResponse<any>>}
   */
  static store (feedbackModel) {
    return http.post('/feedback/questions', feedbackModel.serialize()
    )
  }

  /**
   *
   * @param feedbackModel {FeedbackModel}
   * @return {Promise<*>}
   */
  static toggle (feedbackModel) {
    return http.post(`/feedback/questions/${feedbackModel.id}`, {
      '_method': 'PATCH'
    })
  }

  /**
   *
   * @param feedbackModel {FeedbackModel}
   * @return {Promise<*>}
   */
  static delete (feedbackModel) {
    return http.post(`/feedback/questions/${feedbackModel.id}`, {
      '_method': 'DELETE'
    })
  }
}
