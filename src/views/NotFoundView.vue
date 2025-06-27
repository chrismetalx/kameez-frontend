<script setup>
  import { useRouter } from "vue-router";

  const router = useRouter();

  const back = () => {
    router.push('/dashboard');
  };
</script>

<template>
  <v-card class="mx-auto" color="transparent" elevation="0" max-width="800">
    <div class="d-flex align-center justify-center flex-column">
      <v-card-title class="text-center mt-3 text-h1">Error 404</v-card-title>
      <v-card-text class="text-h6">Oops this page not found.</v-card-text>
    </div>
    <v-card-actions class="justify-center d-flex align-center">
      <v-btn @click="back" variant="flat" color="secondary" size="large">Back to dashboard</v-btn>
    </v-card-actions>
  </v-card>
</template>