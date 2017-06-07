<!--
  Entry view-component

  This component should handle the async load of the json data
  for the different steps of the process (perhapbs it's own content!)
 -->

<!-- This template is for display purposes only, maybe loading screen can be shown -->
<template>
  <canvas ref="wall" class="wall" resize></canvas >
</template>

<script>
// core
import Vue from 'Vue'
// store
import store from 'store'
// utils
import Musicalas from 'utils/musicalas'

export default {
  name: 'wall',
  mounted () {
    let magic = new Musicalas(this.$refs.wall)
  }
}
</script>
