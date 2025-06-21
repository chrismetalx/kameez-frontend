<script setup>
  import { RouterView } from 'vue-router';
  import Navbar from './components/Navbar.vue'
  import ToastContainer from './components/ToastContainer.vue';
</script>

<template>
  <Navbar v-if="!$route.meta.hideNavbar"/>
  <RouterView />
  <ToastContainer/>
</template>

<style>
  body {
    background-color: #D3D3D3;
  }
</style>