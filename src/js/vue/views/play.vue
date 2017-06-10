<!--
  Play view-component
 -->
<template>
  <div class="view view-play play">
    <div v-if="isLoading" class="play_loader">
      <div class="play_loader_progress">
        <div v-bind:style="{width: loaderProgress}" class="play_loader_progress_inner">
        </div>
      </div>
    </div>
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
// utils
import AudioParser from 'classes/audio-parser'
import ScApi from 'classes/sc-api'

export default {
  name: 'home',
  components: {
    Wall
  },
  data () {
    return {
      isLoading: true,
      loaderProgress: '0%',
      percentage: 0
    }
  },
  mounted () {
    // no song sleected, and no id passed
    if (!store.currentTrack && !this.$route.params.id) {
      this.$router.push('/')
      return false
    }
    // id passed
    else if (!store.currentTrack && this.$route.params.id) {
      // get track
      ScApi.getTrack(this.$route.params.id).then((track) => {
        // setup
        store.setCurrentTrack(track)
        AudioParser.setupTrack(store.currentTrack.stream_url)
      })
    }
    else {
      AudioParser.setupTrack(store.currentTrack.stream_url)
    }
    AudioParser.on('loading', (percentage) => {
      this.loaderProgress = percentage + '%'
    })
    AudioParser.on('ready', () => {
      this.isLoading = false
    })
  }
}
</script>
