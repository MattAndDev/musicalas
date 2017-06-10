<!--
  Wall component
 -->
<template>
  <div class="wall">
    <span v-on:click="downloadSvg">get svg</span>
    <span>{{currentTime}} / </span>
    <span>{{totalTime}}</span>
    <canvas class="wall_canvas" ref="wall" resize></canvas >
  </div>
</template>

<script>
// core
import Vue from 'Vue'
// store
import store from 'store'
// utils
import Painter from 'classes/painter'
import AudioParser from 'classes/audio-parser'
import msToS from 'utils/ms-to-s'

export default {
  name: 'wall',
  data () {
    return {
      currentTime: 0,
      totalTime: ''
    }
  },
  mounted () {
    // dock painter on element
    Painter.setUp(this.$refs.wall)
    AudioParser.on('ready', () => {
      this.totalTime = msToS(store.currentTrack.duration)
      let time = 1
      var timer = () => {
        this.currentTime = msToS(time * 1000)
        time = time + 1
      }
      var clock = setInterval(() => { timer() }, 1000)
      AudioParser.on('end', () => {
        clearInterval(clock)
      })
    })
  },
  methods: {
    downloadSvg () {
      Painter.downloadSvg()
    }
  }
}
</script>
