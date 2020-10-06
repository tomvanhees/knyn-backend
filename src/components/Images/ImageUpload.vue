<template>
  <div class="form-group">
    <div class="">
      <label
        class="add-images-container"
        :class="{'active': isActive }"
        for="add-images-input"
        @drop.prevent="addImages($event)"
        @dragover.prevent
      >
        <div :style="progressStatus" />

        <input
          id="add-images-input"
          type="file"
          accept="image/jpeg,image/png"
          style="opacity: 0; position: absolute"
          multiple
          @change="addImages($event)"
        >
        <div>
          <div class="icon text-center">
            <font-awesome-icon icon="cloud-upload-alt" />
          </div>
          <div class="text text-center">
            {{ uploadText }}
          </div>
        </div>

      </label>
    </div>
  </div>
</template>

<script>
import { HandleMediaClass } from '@/classes/HandleMedia.class'

export default {
  name: 'FileUpload',
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    uploadText: {
      type: String,
      required: true
    },
    uploadTo: {
      type: String,
      required: true
    },
  },
  data () {
    return {
      mediaClass: {}
    }
  },
  computed: {
    totalAmountOfFiles () {
      return this.mediaClass.numberOfFiles
    },
    currentAmountOfFiles () {
      return this.mediaClass.responses.length
    },
    progressPercentage () {
      let percentage = 0
      if (this.totalAmountOfFiles !== 0) {
        percentage = (this.currentAmountOfFiles / this.totalAmountOfFiles) * 100
      }
      return -100 + percentage
    },

    progressStatus () {
      return {
        background: '#74a8e9',
        'background-image': 'linear-gradient(to right, #bbd2c5, #536976)',
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: '0',
        left: `${this.progressPercentage}%`
      }
    }
  },
  created () {
    this.mediaClass = new HandleMediaClass()
  },
  methods: {
    /**
     * Recieves Event to add image. Uploads image
     * @param event {Event|DragEvent}
     * */
    async addImages (event) {

      if (event.type !== 'drop' && event.type !== 'change') {
        return
      }

      if (event.type === 'drop') {
        this.mediaClass.onDroppedEvent(event)
      }

      if (event.type === 'change') {
        this.mediaClass.onChangeEvent(event)
      }

      const Promises = await this.mediaClass.upload(this.uploadTo)
      this.addImagesFromRespons(Promises)
    },
    /**
     * Recieves a Axios Promise. If promises are resolved the new images are added to the media array
     * @param Promises {AxiosPromise[]}
     * @param uploadMedia {HandleMediaClass}
     */
    addImagesFromRespons (Promises) {
      Promise.all(Promises)
          .then(() => {
            this.mediaClass.responses.forEach(mediaFile => {
              this.$emit('addMediaFile', mediaFile)
            })
          })
          .finally(() => {
            this.mediaClass.clearMedia()
            this.mediaClass.clearResponses()

          })
    }

  }
}
</script>
