import Vue from 'vue'

export class MessagesService {

  static showSuccesMessage (message) {
    Vue.notify({
      group: 'foo',
      type: 'success',
      title: 'Success',
      text: message,
      duration: 5000,
    })
  }

  static throwErrorMessage (message) {
    Vue.notify({
      group: 'foo',
      type: 'error',
      title: 'Er is iets mis gegaan',
      text: message,
      duration: 5000,
    })
  }

  static throwErrorMessages (errors) {
    // eslint-disable-next-line no-unused-vars
    for (const [key, value] of Object.entries(errors.response.data.errors)) {
      MessagesService.throwErrorMessage(value[0])
    }
  }
}
