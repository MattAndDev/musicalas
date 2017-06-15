<!--
  Entry view-component
 -->
<template>
  <div class="view view-etry">
    <sc-search></sc-search>
  </div>
</template>

<script>
// core
import Vue from 'Vue'
// store
import store from 'store'
// components
import ScSearch from 'components/sc-search.vue'
import ConfigForm from 'components/config-form.vue'

export default {
  name: 'entry',
  components: {
    ScSearch,
    ConfigForm
  },
  mounted () {
  }
}
</script>
