<!--
  Entry view-component

  This component should handle the async load of the json data
  for the different steps of the process (perhapbs it's own content!)
 -->

<!-- This template is for display purposes only, maybe loading screen can be shown -->
<template>
  <div class="view view-etry">
    <wall></wall>
  </div>
</template>

<script>
// core
import Vue from 'Vue'
// store
import store from 'store'
// components
import Wall from 'components/wall.vue'

export default {
  name: 'home',
  components: {
    Wall
  },
  mounted () {
  }
}
</script>
