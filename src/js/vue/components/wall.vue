<!--
  Wall component
 -->
<template>
  <div class="wall">
    <span v-on:click="downloadSvg">get svg</span>
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

export default {
  name: 'wall',
  mounted () {
    // dock painter on element
    Painter.setUp(this.$refs.wall)
  },
  methods: {
    downloadSvg () {
      Painter.downloadSvg()
    }
  }
}
</script>
