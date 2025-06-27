import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {

  const user = ref({});

  const saveUser = (userData) => {
    user.value = userData
  }

  const resetState = () => {
    user.value = null;
  }
  return { saveUser, user, resetState }
}, {
  persist: true,
})
