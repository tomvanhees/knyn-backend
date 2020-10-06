<template>
  <div class="yippo-container">
    <h1 class="view-title">
      Informatie
    </h1>
    <div class="card">
      <div class="card-title">
        Openinguren
      </div>
      <div class="card-body">
        <div class="form-group">
          <label
            for=""
          >Maandag</label>
          <input
            v-model="information.hours.monday"
            type="text"
            class=" form-control"
          >
        </div>
        <div class="form-group">
          <label
            for=""
          >Dinsdag</label>
          <input
            v-model="information.hours.tuesday"
            type="text"
            class=" form-control"
          >
        </div>
        <div class="form-group">
          <label
            for=""
          >Woensdag</label>
          <input
            v-model="information.hours.wednesday"
            type="text"
            class=" form-control"
          >
        </div>
        <div class="form-group row">
          <label
            for=""
          >Donderdag</label>
          <input
            v-model="information.hours.thursday"
            type="text"
            class=" form-control"
          >
        </div>
        <div class="form-group row">
          <label
            for=""
          >Vrijdag</label>
          <input
            v-model="information.hours.friday"
            type="text"
            class=" form-control"
          >
        </div>
        <div class="form-group row">
          <label
            for=""
          >Zaterdag</label>
          <input
            v-model="information.hours.saturday"
            type="text"
            class=" form-control"
          >
        </div>
        <div class="form-group row">
          <label
            for=""
          >Zondag</label>
          <input
            v-model="information.hours.sunday"
            type="text"
            class=" form-control"
          >
        </div>
      </div>
    </div>

    <div class="card mt-10">
      <div class="card-title">
        Social media
      </div>
      <div class="card-body">
        <div class="form-group">
          <label
            for=""
          >Facebook</label>
          <input
            v-model="information.socialMedia.facebook"
            type="text"
            class="form-control"
          >
        </div>
        <div class="form-group">
          <label
            for=""
          >Instagram</label>
          <input
            v-model="information.socialMedia.instagram"
            type="text"
            class="form-control"
          >
        </div>
        <div class="form-group">
          <button
            class="btn btn-primary"
            @click="update"
          >
            <angle-right-button-icon text="Aanpassen" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import InformationService from '@/classes/information/information.service'
import { InformationModel } from '@/classes/information/information.model'
import AngleRightButtonIcon from '@/components/layout/AngleRightButtonIcon'
import { MessagesService } from '@/classes/MessagesService'

export default {
  name: 'Information',
  components: {
    AngleRightButtonIcon
  },
  data () {
    return {
      information: {},
    }
  },
  created () {
    this.information = new InformationModel()

    this.getInformation()
  },
  methods: {
    update () {
      InformationService.post(this.information).then((response) => {
            MessagesService.showSuccesMessage(response.data.message)
          }
      )
    },
    getInformation () {
      InformationService.fetch().then(response => {
        this.information = new InformationModel().deserialize(response.data.content)
      })
    }
  }
}
</script>

<style scoped>

</style>
