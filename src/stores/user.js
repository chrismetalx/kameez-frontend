import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {

  const user = ref({});

  const saveUser = (userData) => {
    user.value = userData
  }
  return { saveUser, user }
}, {
  persist: true,
})
