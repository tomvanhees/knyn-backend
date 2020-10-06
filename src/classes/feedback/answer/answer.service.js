import http from '@/http/http'

export class AnswerService {
  static async fetch () {
    return http('/feedback/answers')
  }
}
