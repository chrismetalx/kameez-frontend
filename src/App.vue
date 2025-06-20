<script setup>
  import { RouterLink, RouterView } from 'vue-router';
  import { useRoute } from 'vue-router';
  import Navbar from './components/Navbar.vue'

  const route = useRoute();
</script>

<template>
  <Navbar v-if="!$route.meta.hideNavbar"/>
  <RouterView />
</template>

<style>
  body {
    background-color: #D3D3D3;
  }
</style>