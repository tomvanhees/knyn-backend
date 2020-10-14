<template>
  <div>
    <view-title title="Instellingen" />

    <div class="card">
      <div class="card-title">
        <div class="card-title-text">
          App instellingen
        </div>
      </div>
      <div class="card-body">
        <div class="form-group">
          <label for="">Thema</label>
          <div class="d-flex">
            <select-accent-input
              v-model="configurations.app_theme"
              base="theme"
              color="dark"
              text=""
            />
            <!--            <select-accent-input-->
            <!--              v-model="configurations.app_theme"-->
            <!--              base="theme"-->
            <!--              color="light"-->
            <!--              text=""-->
            <!--            />-->
          </div>
        </div>

        <div class="form-group">
          <label for="">Accentkleur</label>
          <div class="d-flex">
            <select-accent-input
              v-model="configurations.app_accent"
              base="accent"
              color="blue"
              text=""
            />
            <select-accent-input
              v-model="configurations.app_accent"
              base="accent"
              color="purple"
              text=""
            />
            <select-accent-input
              v-model="configurations.app_accent"
              base="accent"
              color="pink"
              text=""
            />
            <select-accent-input
              v-model="configurations.app_accent"
              base="accent"
              color="red"
              text=""
            />
            <select-accent-input
              v-model="configurations.app_accent"
              base="accent"
              color="orange"
              text=""
            />
            <select-accent-input
              v-model="configurations.app_accent"
              base="accent"
              color="yellow"
              text=""
            />
            <select-accent-input
              v-model="configurations.app_accent"
              base="accent"
              color="green"
              text=""
            />
          </div>
        </div>

        <div class="form-group">
          <label for="">Logo</label>
          <div class="d-flex">
            <div style="width: 300px; height:200px">
              <img
                :src="configurations.app_logo"
                alt=""
                style="max-width: 300px; max-height:200px"
              >
            </div>
            <div>
              <input
                type="file"
                name="logo"
                style="width: 100%;height: 100%"
                @change="addImage($event,'logo')"
              >
            </div>
          </div>
        </div>

        <div class="form-group">
          <label for="">Achtergrond</label>
          <div class="d-flex">
            <div style="width: 300px; height:200px">
              <img
                :src="configurations.app_background"
                alt=""
                style="max-width: 300px; max-height:200px"
              >
            </div>
            <div>
              <input
                type="file"
                name="background"
                @change="addImage($event,'background')"
              >
            </div>
          </div>
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

import ViewTitle from '@/components/layout/ViewTitle'
import http from '@/http/http'
import SelectAccentInput from '@/components/Configuration/ColorInput'
import AngleRightButtonIcon from '@/components/layout/AngleRightButtonIcon'
import { MessagesService } from '@/classes/MessagesService'

export default {
  name: 'Main',
  components: {
    ViewTitle,
    SelectAccentInput,
    AngleRightButtonIcon
  },
  data () {
    return {
      configurations: {},
      logoInput: '',
      backgroundInput: ''
    }
  },
  created () {
    http.get('/configurations').then(response => {
      this.configurations = response.data.content
    })
  },
  methods: {
    addImage (event, type) {
      event.preventDefault()

      if (type === 'logo') {
        this.logoInput = event.target.files
      }
      if (type === 'background') {
        this.backgroundInput = event.target.files
      }
    },
    update () {
      const formdata = new FormData
      formdata.append('app_theme', this.configurations.app_theme)
      formdata.append('app_accent', this.configurations.app_accent)

      if (this.logoInput.length !== 0) {
        formdata.append('app_logo', this.logoInput[0])
      }

      if (this.backgroundInput.length !== 0) {
        formdata.append('app_background', this.backgroundInput[0])
      }

      http.post('/configurations', formdata).then(response => {
        this.configurations = response.data.content
      }).catch(errors => {
        MessagesService.throwErrorMessages(errors)
      })
    }
  }
}
</script>

<style lang="scss">
.rounded-selection {
  position: relative;
  display: flex;

  input {
    opacity: 0;
    position: absolute;
  }

  label {
    display: inline-block;
    position: relative;
    width: 60px;
    height: 60px;
    border-radius: 8px;
    margin-right: 10px;
    box-shadow: 10px 10px 49px -25px rgba(0, 0, 0, 0.75);

    &.dark {
      background: #020003;
    }

    &.light {
      background: #dbdbdb;
    }

    &.blue {
      background: #0f72d8;

    }

    &.red {
      background: #fb4b56;
    }

    &.purple {
      background: #a547a7;
    }

    &.pink {
      background: #f242a5;
    }

    &.green {
      background: #5fc03b;
    }

    &.yellow {
      background: #ffb437;
    }

    &.orange {
      background: #fd7e13;
    }
  }

  input:checked + label::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 10px;
    width: 10px;
    background-color: white;
    border-radius: 50%;
  }

}
</style>
