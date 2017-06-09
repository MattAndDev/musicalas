<!--
  Entry view-component

  This component should handle the async load of the json data
  for the different steps of the process (perhapbs it's own content!)
 -->

<!-- This template is for display purposes only, maybe loading screen can be shown -->
<template>
  <div class="wall">
    <div v-if="isLoading" class="wall_loader"></div>
    <canvas class="wall_canvas" ref="wall" resize></canvas >
  </div>
</template>

<script>
// core
import Vue from 'Vue'
// store
import store from 'store'
// utils
import AudioParser from 'utils/audio-parser'
import Painter from 'utils/painter'

export default {
  name: 'wall',
  data () {
    return {
      isLoading: true
    }
  },
  mounted () {
    // no song sleected, roll back
    if (!store.currentTrack) this.$router.push('/')
    AudioParser.setupTrack(store.currentTrack.stream_url)
    let painter = new Painter(this.$refs.wall)
    AudioParser.on('ready', () => {
      this.isLoading = false
    })
  }
}
</script>
