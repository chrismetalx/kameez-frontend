import axios from 'axios';
import { useUserStore } from '../stores/user.js';
import router from '@/router';
import { useToast } from '../composables/useToast';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
});

// Interceptor de solicitudes
apiClient.interceptors.request.use(
  (config) => {
    const userStore = useUserStore();
    const token = userStore.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 403) {
      const userStore = useUserStore();
      const { showToast } = useToast();
      const { resetState } = userStore;

      resetState();
      showToast('Your session has expired. Please log in again.', 'error');

      setTimeout(() => {
        router.push('/');
      }, 1500);
    }

    return Promise.reject(error);
  }
);

export default apiClient;