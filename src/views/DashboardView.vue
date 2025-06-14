<script setup>
  import { useUserStore } from '@/stores/user';
  import { storeToRefs } from 'pinia';

  const useUser = useUserStore();

  const { user } = storeToRefs(useUser);
</script>

<template>
  <h1>Bienvenido: {{ user.firstName}} {{ user.lastName }} | Correo: {{ user.email }}</h1>
</template>