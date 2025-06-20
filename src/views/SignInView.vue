<script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import { useUserStore } from '@/stores/user';
  import { useRouter } from 'vue-router';
  import { useToast } from 'vue-toastification';

  const toast = useToast();

  onMounted(() => {
    const storedToast = localStorage.getItem('redirectToast');

    if (storedToast) {
      const toastData = JSON.parse(storedToast);
      toast.success(toastData.message, { timeout: toastData.timeout });
      localStorage.removeItem('redirectToast');
    }
  });

  const visible = ref(false);
  const isLoading = ref();
  //Router
  const router = useRouter();
  //Pinia
  const useUser = useUserStore();

  const { saveUser } = useUser;

  const user = ref({
    email: '',
    password: ''
  });

  const errorMessage = ref('');

  const signInFunctionality = async () => {
    isLoading.value = true;
    try {
      errorMessage.value = '';

      const { data } = await axios.get(`${import.meta.env.VITE_APP_API_URL}/user?email=${user.value.email}&password=${user.value.password}`);

      if (data.length === 0) {
        throw new Error('Email or password incorrectly.');
      };

      const userData = data[0];

      saveUser(userData);

      router.push('/dashboard');
    } catch (error) {
      errorMessage.value = error.message || 'An error occurred.';
    } finally {
      isLoading.value = false;
    }
  };
</script>

<template>
  <div>
    <v-card
      class="mx-auto pa-10 pt-0 pb-4 my-10"
      elevation="8"
      max-width="448"
      rounded="lg"
    >
      <v-container class="d-flex d-flex justify-center align-center flex-column">
        <img src="../assets/logo/logo.png" alt="logo" width="150">
      </v-container>
      <v-card-title class="text-left text-h5 greet text-secondary mt-n7 mb-5">
        Welcome to Kameez! 👋
      </v-card-title>
      <v-card-text>
        <v-alert
          v-if="errorMessage"
          type="warning"
          class="mb-8"
          color="grey-lighten-2"
          border="start"
        >
          {{ errorMessage }}
        </v-alert>
        <v-form :submit.prevent="signInFunctionality">
          <v-text-field
            v-model="user.email"
            density="compact"
            type="email"
            label="Email address"
            placeholder="JohnDoe@email.com"
            variant="outlined"
          ></v-text-field>
          <v-text-field
            v-model="user.password"
            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
            :type="visible ? 'text' : 'password'"
            density="compact"
            label="Password"
            placeholder="Enter your password"
            variant="outlined"
            @click:append-inner="visible = !visible"
          ></v-text-field>
          <div class="d-flex justify-end mb-3">
            <router-link to="/reset-password" class="text-decoration-none text-secondary">Forgot Password?</router-link>
          </div>
          <v-btn
            :loading="isLoading"
            :disabled="isLoading"
            class="mb-4"
            color="primary"
            size="large"
            block
            type="submit"
          >
            Login
          </v-btn>
        </v-form>
      </v-card-text>
      <v-card-actions class="justify-center mt-2">
      <span>
        New on our platform?
        <router-link to="/sign-up" class="ml-5 text-secondary text-decoration-none">Create an account</router-link>
      </span>
    </v-card-actions>
    </v-card>
  </div>
</template>
