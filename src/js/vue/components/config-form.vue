<!--
  ScSearch component
 -->
<template>
  <div class="configForm">
    <form v-on:submit.prevent=""  class="onSearchSubmit_form">
      <p>Configuration: use with care</p>
      <label for="points">Points <span>max ~ 40</span></label>
      <input v-on:keyup="onChange" ref="points" type="number" name="points" value="25">
      <label for="alanalyzedBandWidth">Bandwith to analayze (alway starting at 0) in Hz <span>max ~ 20000</span></label>
      <input v-on:keyup="onChange" ref="alanalyzedBandWidth" type="number" name="alanalyzedBandWidth" value="15000">
      <label for="radialRepeaters">Radial repeaters <span>max ~ 14</span></label>
      <input v-on:keyup="onChange" ref="radialRepeaters" type="number" name="radialRepeaters" value="10">
      <label for="analyzerRanges">Nuber of ranges to analyze <span>max ~ 14</span></label>
      <input v-on:keyup="onChange" ref="analyzerRanges" type="number" name="analyzerRanges" value="6">
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
      tracks: false
    }
  },
  methods: {
    onChange (e) {
      Painter.config[e.target.name] = e.target.value
    }
  },
  mounted () {
  }
}
</script>
