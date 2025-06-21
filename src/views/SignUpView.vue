<script setup>
  import { ref } from 'vue'
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  import { useToast } from '../composables/useToast';

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
    confirmPassword: ""
  });

  const errorMessage = ref('');

  const signUpFunctionality = async () => {
    isLoading.value = true;
    try {
      if (user.value.firstName === "") {
        throw new Error('The first name field is required.');
      }

      if (user.value.lastName === "") {
        throw new Error('The last name field is required.');
      }

      if (user.value.email === "") {
        throw new Error('The email field is required.');
      }

      if (user.value.password === "") {
        throw new Error('The password field is required.');
      }

      if (user.value.confirmPassword === "") {
        throw new Error('The confirm password field is required.');
      }

      if (terms.value === false) {
        throw new Error('Accept the terms and services.');
      }

      errorMessage.value = '';

      const { data } = await axios.get(`${import.meta.env.VITE_APP_API_URL}/user?email=${user.value.email}`);

      if (data.length === 1) {
        throw new Error('Already exist an user with the email.');
      }

      if (user.value.password !== user.value.confirmPassword) {
        throw new Error('The password and confirm password do not match.');
      }

      const newUser = {
        firstName: user.value.firstName,
        lastName: user.value.lastName,
        email: user.value.email,
        password: user.value.password,
      }

      await axios.post(`${import.meta.env.VITE_APP_API_URL}/user`, newUser);

      user.value.firstName = "";
      user.value.lastName = "";
      user.value.email = "";
      user.value.password = "";
      user.value.confirmPassword = "";

      showToast('User created successfully!', 'success');
      router.push('/');
    } catch (error) {
      errorMessage.value = error.message || 'An error occurred.';
    } finally {
      isLoading.value = false;
      terms.value = false;
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
          class="mb-8"
          color="grey-lighten-2"
          border="start"
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
          <div class="d-flex justify-space-between align-center mb-3">
            <v-checkbox
              v-model="terms"
              label="I agree to privacy policy & terms"
              color="primary"
              hide-details
            ></v-checkbox>
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
