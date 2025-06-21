<script setup>
  import { useToast } from '@/composables/useToast';

  const { toasts, removeToast } = useToast();
</script>

<template>
  <div class="toast-container">
    <div
      v-for="toast in toasts"
      :key="toast.id"
      :class="['toast-item', `toast-${toast.type}`]"
      @click="removeToast(toast.id)"
    >
      {{ toast.message }}
    </div>
  </div>
</template>

<style scoped>
  /* Add your toast styling here */
  .toast-container {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 9999;
  }
  .toast-item {
    padding: 10px 15px;
    margin-bottom: 10px;
    border-radius: 5px;
    color: white;
    cursor: pointer;
  }
  .toast-info { background-color: #3498db; }
  .toast-success { background-color: #22BB33; }
  .toast-error { background-color: #FF3333; }
</style>