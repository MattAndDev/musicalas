<!--
  Wall component
 -->
<template>
  <div class="wall">
      <p class="wall_info">
        <span>{{track.title}}</span><br>
        <span>Time: {{currentTime}} / </span><span>{{totalTime}}</span><br>
        <span>Saved images / required: {{saves}}/{{availableSaves}}</span>
      </p>
      <div class="wall_controls">
        <span v-on:click="saveSvg" class="btn">Save this image</span><br>
        <span v-on:click="getZip" class="btn">Get current raw data</span><br>
        <div v-if="saves === availableSaves" class="wall_controls_poster">
          <input ref="posterText" type="text" name="" value="" placeholder="Text on poster">
          <span class="btn" v-on:click="getPoster">Get poster (beta)</span>
        </div>
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
import MvckeApi from 'classes/mvcke-api'
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
      track: store.currentTrack,
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
      MvckeApi.getZip()
    },
    saveSvg () {
      if (this.saves >= this.availableSaves) {
        alert('Sorry no more saves')
        return false
      }
      else {
        MvckeApi.saveSvg(this.time)
        MvckeApi.savePng(this.time)
        this.saves = this.saves + 1
      }
    },
    getPoster () {
      if (this.saves < this.availableSaves) {
        alert('Sorry more images needed')
        return false
      }
      else {
        MvckeApi.getPoster(this.$refs.posterText.value)
      }
    }
  }
}
</script>
