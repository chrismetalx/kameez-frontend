<script setup>
  import { ref } from 'vue'
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  import { useToast } from '../composables/useToast';
  import UserTerms from '@/components/UserTerms.vue';

  const { showToast } = useToast();
  const visible = ref(false);
  const terms = ref(false);
  const isLoading = ref();

  const router = useRouter();

  const user = ref({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false
  });

  const successMessage = ref('');
  const errorMessage = ref('');

  const signUpFunctionality = async () => {
    isLoading.value = true;
    try {
      successMessage.value = '';
      errorMessage.value = '';

      const { data } = await axios.post(`${import.meta.env.VITE_APP_API_URL}/users`, user.value);

      successMessage.value = data.message;

      user.value = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        terms: false
      };

      showToast(successMessage.value, 'success');
      router.push('/');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage.value = error.response.data.message;
      }
    } finally {
      isLoading.value = false;
    }
  }
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
      <v-card-title class="text-left text-h5 greet text-secondary ml-n1 mt-n7 mb-2">
        Sign up to get started 🚀
      </v-card-title>
      <v-card-text>
        <v-alert
          v-if="errorMessage"
          type="warning"
          class="mb-8 border-opacity-100 text-warning bg-grey-lighten-3 border-warning border-md"
          border="top"
          variant="outlined"
        >
          {{ errorMessage }}
        </v-alert>
        <v-form :submit.prevent="signUpFunctionality">
          <v-text-field
            v-model="user.firstName"
            label="First Name"
            type="text"
            required
            density="compact"
            placeholder="John"
            variant="outlined"
          ></v-text-field>
          <v-text-field
            v-model="user.lastName"
            label="Last Name"
            density="compact"
            placeholder="Doe"
            variant="outlined"
            type="text"
          ></v-text-field>
          <v-text-field
            v-model="user.email"
            label="Email address"
            density="compact"
            placeholder="JohnDoe@email.com"
            variant="outlined"
            type="email"
          ></v-text-field>
          <v-text-field
            v-model="user.password"
            label="Password"
            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
            :type="visible ? 'text' : 'password'"
            density="compact"
            placeholder="Enter your password"
            variant="outlined"
            @click:append-inner="visible = !visible"
          ></v-text-field>
          <v-text-field
            class="mt-2"
            v-model="user.confirmPassword"
            label="Confirm password"
            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
            :type="visible ? 'text' : 'password'"
            density="compact"
            placeholder="Confirm your password"
            variant="outlined"
            @click:append-inner="visible = !visible"
          ></v-text-field>
          <div class="d-flex align-center mb-3">
            <v-checkbox
              v-model="user.terms"
              color="primary"
              hide-details
            ></v-checkbox>
            <p class="mr-1">I agree to</p>
            <UserTerms :loading="isLoading"/>
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
            Sign Up
          </v-btn>
        </v-form>
      </v-card-text>
      <v-card-actions class="justify-center mt-2">
      <span>
        Already have an account?
        <router-link to="/" class="ml-5 text-secondary text-decoration-none">Sign in instead</router-link>
      </span>
    </v-card-actions>
    </v-card>
  </div>
</template>
