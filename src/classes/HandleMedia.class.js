import { MediaItemClass } from '@/classes/media/mediaItem.class'
import http from '@/http/http'
import { MessagesService } from '@/classes/MessagesService'

export class HandleMediaClass {
  media = []
  responses = []
  numberOfFiles = 0

  /**
   * @param event {Event}
   */
  onChangeEvent (event) {
    const target = event.target

    if (!target.files) {
      throw  'No files set'
    }
    const files = target.files
    this.setMedia(files)
  }

  /**
   * @param event {DragEvent}
   */
  onDroppedEvent (event) {
    event.stopPropagation()
    event.preventDefault()

    if (!event.dataTransfer) {
      throw  'No files set'
    }

    const files = event.dataTransfer.files

    this.setMedia(files)
  }

  /**
   * @param to {string}
   * @return {[]}
   */
  upload (to) {
    const Promises = []
    this.media.forEach(file => {
      Promises.push(new Promise((resolve => {
        const formData = new FormData
        formData.append(`image`, file)
        formData.append('_method', 'PATCH')

        http.post(to, formData)
          .then((response) => {
            this.responses.push(new MediaItemClass().deserialize(response.data))
            resolve()
          }).catch(errors => {
          MessagesService.throwErrorMessages(errors)
          resolve()
        })
      })))

    })
    return Promises
  }

  /**
   * @param files {FileList}
   */
  setMedia (files) {
    this.numberOfFiles = files.length;

    [...files].forEach((file) => {
      this.media.push(file)
    })
  }

  /**
   * @return {File[]}
   */
  getMedia () {
    return this.media
  }

  clearMedia () {
    this.media = []
  }

  clearResponses () {
    this.numberOfFiles = 0
    this.responses = []
  }

}
