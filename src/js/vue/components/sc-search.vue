<!--
  ScSearch component
 -->
<template>
  <div class="scSearch">
    <h1 class="scSearch_title">m<span>v</span>cke</h1>
    <p class="scSearch_text">music visualisation and mass customisation <br> search for a song // save svgs // create poster</p>
    <form v-on:submit.prevent="onSearchSubmit"  class="scSearch_form">
      <input v-on:keyup="onKeyUp" class="scSearch_form_input" ref="searchQueryField" type="text" name="" value="" placeholder="search soundcloud for ..." required>
      <input class="scSearch_form_btn btn" type="submit" name="" value="search">
    </form>
    <ul class="scSearch_results" v-if="tracks">
      <li class="scSearch_results_item"
        v-for="track in tracks"
        v-on:click='onSongSelect'
        :id="track.id">
          <span>{{track.title}} - {{track.parsedDuration}}</span>
          <span class="scSearch_results_item_submit">
            <svg class="scSearch_results_item_submit_icon icon">
              <use xlink:href="images/sprite.svg#i-search-select-arrow"></use>
            </svg>
          </span>
      </li>
    </ul>
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
import ScApi from 'classes/sc-api'
import msToS from 'utils/ms-to-s'

export default {
  name: 'sc-search',
  data () {
    return {
      tracks: false
    }
  },
  methods: {
    // onFormSubmit
    onSearchSubmit () {
      // if no query do nothing
      if (this.$refs.searchQueryField.value.length === 0) return false
      // else search
      this.search()
    },
    // onSongSelect
    onSongSelect (e) {
      // get id and fetch song from this.tracks
      let id = e.target.closest('li').getAttribute('id')
      let selectedTrack = _.find(this.tracks, (o) => { return parseInt(o.id) === parseInt(id) })
      store.setCurrentTrack(selectedTrack)
      this.$router.push('/play')
    },
    onKeyUp (e) {
      if (this.$refs.searchQueryField.value <= 4) {
        this.tracks = []
      }
      // else search
      else {
        this.search()
      }
    },
    search () {
      let query = this.$refs.searchQueryField.value
      // else search via ScApi
      ScApi.search(query).then((tracks) => {
        // if no results
        if (!tracks.length) alert(`Sorry nothign found on soundcloud for ${query}`)
        // convert track duration from millis to minutes + seconds
        _.each(tracks, (track) => { track.parsedDuration = msToS(track.duration) })
        // then expose tracks
        this.tracks = tracks
      })
    }
  },
  mounted () {
  }
}
</script>
