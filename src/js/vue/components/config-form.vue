<!--
  ScSearch component
 -->
<template>
  <div class="configForm">
    <form v-on:submit.prevent=""  class="onSearchSubmit_form">
      <p>
        Configuration: use with care<br>
        Expected number of vertices on canvas: {{vertices}}
      </p>
      <label for="points">Points <span>max ~ 40</span></label>
      <input v-on:keyup="onChange" ref="points" type="number" name="points" value="25">
      <label for="alanalyzedBandWidth">Bandwith to analayze (alway starting at 0) in Hz <span>max ~ 20000</span></label>
      <input v-on:keyup="onChange" ref="alanalyzedBandWidth" type="number" name="alanalyzedBandWidth" value="15000">
      <label for="radialRepeaters">Radial repeaters <span>max ~ 14</span></label>
      <input v-on:keyup="onChange" ref="radialRepeaters" type="number" name="radialRepeaters" value="10">
      <label for="analyzerRanges">Nuber of ranges to analyze <span>max ~ 14</span></label>
      <input v-on:keyup="onChange" ref="analyzerRanges" type="number" name="analyzerRanges" value="6">
      <label for="hasMirrors">Decide if the axis get mirrored or not (mirrored == snowflake, not mirrored === spiral)</span></label><br>
      <input v-on:change="onChange" ref="hasMirrors" type="checkbox" name="hasMirrors" checked="true">
    </form>
  </div>
</template>

<script>
// core
import Vue from 'Vue'
// libs
import _ from 'lodash'
// store
import store from 'store'
// utils
import Painter from 'classes/painter'
import msToS from 'utils/ms-to-s'

export default {
  name: 'sc-search',
  data () {
    return {
      tracks: false,
      vertices: 0
    }
  },
  methods: {
    onChange (e) {
      if (e.target.type === 'checkbox') {
        Painter.config[e.target.name] = e.target.checked
      }
      else {
        Painter.config[e.target.name] = e.target.value
      }
      this.calculateVertices()
    },
    calculateVertices () {
      let points = parseInt(this.$refs.points.value)
      let radialRepeaters = parseInt(this.$refs.radialRepeaters.value)
      let analyzerRanges = parseInt(this.$refs.analyzerRanges.value)
      let hasMirrors = this.$refs.hasMirrors.checked ? 2 : 1
      this.vertices = points * radialRepeaters * analyzerRanges * hasMirrors
    }
  },
  mounted () {
    this.calculateVertices()
  }
}
</script>
