import http from '@/http/http'

export default class InformationService {
  static fetch () {
    return http.get('/information')
  }

  static post (information) {
    return http.post('/information', {
      content: information.serialize(),
    })
  }
}
