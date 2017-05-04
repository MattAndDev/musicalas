<!--
  Entry view-component

  This component should handle the async load of the json data
  for the different steps of the process (perhapbs it's own content!)
 -->

<!-- This template is for display purposes only, maybe loading screen can be shown -->
<template>
  <div ref="wall" class="wall">
  </div>
</template>

<script>
// core
import Vue from 'Vue'
// store
import store from 'store'
// utils
import Paper from 'utils/paper'

export default {
  name: 'wall',
  mounted () {
    let paper = new Paper(this.$refs.wall)
  }
}
</script>
