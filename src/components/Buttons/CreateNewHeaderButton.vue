<template>
  <!--  <div class="create-button">-->
  <!--    <router-link-->
  <!--      :to="to"-->
  <!--      as="div"-->
  <!--      class="title-button-container"-->
  <!--    >-->
  <!--      <div class="title-text">-->
  <!--        {{ text }}-->
  <!--      </div>-->
  <!--      <div class="title-button">-->
  <!--        <span><font-awesome-icon icon="plus" /></span>-->
  <!--      </div>-->
  <!--    </router-link>-->
  <!--  </div>-->

  <div>
    <header-button
      :text="text"
      :to="to"
    >
      <template v-slot:icon>
        <span><font-awesome-icon icon="plus" /></span>
      </template>
    </header-button>
  </div>
</template>

<script>
import HeaderButton from '@/components/Buttons/HeaderButton'

export default {
  name: 'CreateNewButton',
  components:{
    HeaderButton
  },
  props:{
    to:{
      type: String,
      required: true
    },
    text:{
      type: String,
      required: false,
      default: 'Aanmaken'
    }
  }
}
</script>
