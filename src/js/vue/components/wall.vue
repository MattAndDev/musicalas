<!--
  Wall component
 -->
<template>
  <div class="wall">
    <div class="wall_controls">
      <span v-on:click="saveSvg">save svg</span>
      <span v-on:click="getZip">get zip</span>
      <br>
      <span>Saves: {{saves}}/{{availableSaves}}</span>
      <br>
      <span>{{currentTime}} / </span><span>{{totalTime}}</span>
      <input ref="posterText" type="text" name="" value="" placeholder="Text on poster">
      <span v-on:click="getPoster">get poster</span>
    </div>
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
      totalTime: '',
      time: 0,
      availableSaves: 10,
      saves: 0
    }
  },
  mounted () {
    // dock painter on element
    Painter.setUp(this.$refs.wall)
    AudioParser.on('ready', () => {
      this.totalTime = msToS(store.currentTrack.duration)
      let time = 1
      var timer = () => {
        this.currentTime = msToS(time * 100)
        time = time + 1
        this.time = time
      }
      var clock = setInterval(() => { timer() }, 100)
      AudioParser.on('end', () => {
        clearInterval(clock)
      })
    })
  },
  methods: {
    getZip () {
      Painter.getZip()
    },
    saveSvg () {
      if (this.saves >= this.availableSaves) {
        alert('Sorry no more saves')
        return false
      }
      else {
        Painter.saveSvg(this.time)
        Painter.savePng(this.time)
        this.saves = this.saves + 1
      }
    },
    getPoster () {
      if (this.saves < this.availableSaves) {
        alert('Sorry more images needed')
        return false
      }
      else {
        Painter.getPoster(this.$refs.posterText.value)
      }
    }
  }
}
</script>
