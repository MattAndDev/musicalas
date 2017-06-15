<!--
  ScSearch component
 -->
<template>
  <div class="configForm">
    <span v-on:click.prevent="toggleSelf" ref="toggler" class="configForm_toggler">
      <svg ref="togglerIcon" class="configForm_toggler_icon icon">
        <use xlink:href="images/sprite.svg#i-config-form-toggler"></use>
      </svg>
    </span>
    <form class="configForm_form" v-on:submit.prevent="">
      <p class="configForm_form_entry">
        Configuration: use with care<br>
        Expected number of vertices on canvas: {{vertices}}
      </p>
      <fieldset class="configForm_form_fieldset">
        <label class="configForm_form_label" for="points">Points <span>max ~ 40</span></label>
        <input class="configForm_form_input" v-on:keyup="onChange" ref="points" type="number" name="points" value="25">
      </fieldset>
      <fieldset class="configForm_form_fieldset">
        <label class="configForm_form_label" for="alanalyzedBandWidth">Bandwith to analayze (alway starting at 0) in Hz <span>max ~ 20000</span></label>
        <input class="configForm_form_input" v-on:keyup="onChange" ref="alanalyzedBandWidth" type="number" name="alanalyzedBandWidth" value="15000">
      </fieldset>
      <fieldset class="configForm_form_fieldset">
        <label class="configForm_form_label" for="radialRepeaters">Radial repeaters <span>max ~ 14</span></label>
        <input class="configForm_form_input" v-on:keyup="onChange" ref="radialRepeaters" type="number" name="radialRepeaters" value="10">
      </fieldset>
      <fieldset class="configForm_form_fieldset">
        <label class="configForm_form_label" for="analyzerRanges">Nuber of ranges to analyze <span>max ~ 14</span></label>
        <input class="configForm_form_input" v-on:keyup="onChange" ref="analyzerRanges" type="number" name="analyzerRanges" value="6">
      </fieldset>
      <fieldset class="configForm_form_fieldset">
        <label class="configForm_form_label" for="hasMirrors">Mirror axis</span></label><br>
        <input class="configForm_form_input" v-on:change="onChange" ref="hasMirrors" type="checkbox" name="hasMirrors" checked="true">
      </fieldset>
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
    },
    toggleSelf () {
      if (this.$el.style.transform.length <= 1) {
        this.$el.style.transform = 'translate(0, -100%)'
        this.$refs.toggler.style.background = '#1FE89F'
      }
      else {
        this.$refs.toggler.style.background = '#878787'
        this.$el.style.transform = ''
      }
    }
  },
  mounted () {
    this.calculateVertices()
  }
}
</script>
