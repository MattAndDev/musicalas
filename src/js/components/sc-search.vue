<!--
  Entry view-component

  This component should handle the async load of the json data
  for the different steps of the process (perhapbs it's own content!)
 -->

<!-- This template is for display purposes only, maybe loading screen can be shown -->
<template>
  <div class="scSearch">
    <form v-on:submit.prevent="onSearchSubmit"  class="scSearch_form">
      <input ref="searchQueryField" type="text" name="" value="" placeholder="Song name, artist, something" required>
      <input type="submit" name="" value="Search">
    </form>
    <ul class="scSearch_results" v-if="tracks">
      <li v-for="track in tracks" v-on:click='onSongSelect' :id="track.id" class="scSearch_results_item">{{track.title}}</li>
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
import Musicalas from 'utils/musicalas'
import ScApi from 'utils/sc-api'

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
      let query = this.$refs.searchQueryField.value
      // if no query do nothing
      if (query.length === 0) return false
      // else search via ScApi
      ScApi.search(query).then((tracks) => {
        // then expose tracks
        this.tracks = tracks
      })
    },
    // onSongSelect
    onSongSelect (e) {
      // get id and fetch song from this.tracks
      let id = e.target.getAttribute('id')
      let selectedTrack = _.find(this.tracks, (o) => { return parseInt(o.id) === parseInt(id) })
      store.setCurrentTrack(selectedTrack)
      this.$router.push('/play')
    }
  },
  mounted () {
  }
}
</script>
