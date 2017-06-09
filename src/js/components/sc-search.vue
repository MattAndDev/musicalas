<!--
  Entry view-component

  This component should handle the async load of the json data
  for the different steps of the process (perhapbs it's own content!)
 -->

<!-- This template is for display purposes only, maybe loading screen can be shown -->
<template>
  <form v-on:submit.prevent="onSubmit"  class="scForm">
    <input ref="searchQueryField" type="text" name="" value="" placeholder="Song name, artist, something">
    <input type="submit" name="" value="Search">
  </form>
</template>

<script>
// core
import Vue from 'Vue'
// store
import store from 'store'
// utils
import Musicalas from 'utils/musicalas'

export default {
  name: 'sc-search',
  methods: {
    onSubmit () {
      console.log(this.$refs.searchQueryField.value);
      console.log(this.$refs);
    }
  },
  mounted () {
  }
}
</script>
