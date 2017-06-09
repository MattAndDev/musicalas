<!--
  Entry view-component
 -->

<!-- This template is for display purposes only, maybe loading screen can be shown -->
<template>
  <sc-search></sc-search>
</template>

<script>
// core
import Vue from 'Vue'
// store
import store from 'store'
// components
import ScSearch from 'components/sc-search.vue'

export default {
  name: 'home',
  components: {
    ScSearch
  },
  mounted () {
  }
}
</script>
