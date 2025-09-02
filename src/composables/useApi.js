import axios from 'axios';
import { ref } from 'vue';
import { useUserStore } from '../stores/user.js';
import router from '@/router';
import { useToast } from '../composables/useToast';

let isRedirecting = false;

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL
});

export function useApi() {
  const data = ref(null);
  const error = ref(null);
  const saveLoading = ref(false);
  const userStore = useUserStore();
  const { showToast } = useToast();

  api.interceptors.request.use(
    (config) => {
      const token = userStore.token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  api.interceptors.response.use(
    (response) => response,
    (err) => {
      if (err.response && err.response.status === 403 && !isRedirecting) {
        isRedirecting = true;
        userStore.resetState();
        showToast('Your session has expired. Please log in again.', 'error');

        setTimeout(() => {
          router.push('/');
          isRedirecting = false;
        }, 1500);
      }
      return Promise.reject(err);
    }
  );

  const execute = async (method, url, body = null) => {
    saveLoading.value = true;
    data.value = null;
    error.value = null;

    try {
      const response = await api({
        method,
        url,
        data: body,
      });
      data.value = response.data;
    } catch (err) {
      error.value = err.response ? err.response.data : err.message;
    } finally {
      saveLoading.value = false;
    }
  };

  return {
    data,
    error,
    saveLoading,
    execute,
  };
}