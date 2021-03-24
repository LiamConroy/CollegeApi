<template>
  <div>
    <Navbar/> 
    <b-container>
      <b-row>
        <router-view />
      </b-row>
    </b-container>
  </div>
</template>

<script>

import Navbar from './components/Navbar.vue'

export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>

<style>
</style>
