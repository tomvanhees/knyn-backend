<template>
  <div>
    <transition
      name="component-fade"
      mode="out-in"
    >
      <div class="yippo-container">
        <router-view />
      </div>
    </transition>
  </div>
</template>

