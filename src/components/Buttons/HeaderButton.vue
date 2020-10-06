<template>
  <div class="header-button">
    <router-link
      :to="to"
      as="div"
      class="title-button-container"
    >
      <div class="title-text">
        {{ text }}
      </div>
      <div class="title-button">
        <slot name="icon">
          <span><font-awesome-icon icon="angle-right" /></span>
        </slot>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'CreateNewButton',
  props: {
    to: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: false,
      default: 'Aanmaken'
    }
  }
}
</script>
