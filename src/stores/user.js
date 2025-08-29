import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {

  const user = ref({});
  const token = ref('');

  const saveUser = (userData) => {
    user.value = userData
  }
  console.log(user.value);
  console.log(token.value);
  const resetState = () => {
    user.value = {};
    token.value = ''
  }
  return { saveUser, user, resetState, token }
}, {
  persist: true,
})
