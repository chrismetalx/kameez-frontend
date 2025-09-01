<script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import axios from 'axios';

  const visible = ref(false);
  const isLoading = ref(false);
  const successMessage = ref('');
  const errorMessage = ref('');
  const showCard = ref(false);
  const router = useRouter();

  const user = ref({
    email: "",
    password: "",
    confirmPassword: ""
  });

  const resetPasswordFunctionality = async () => {
    isLoading.value = true;
    try {
      successMessage.value = '';
      errorMessage.value = '';

      const { email, password, confirmPassword } = user.value;

      if (!email) {
        return errorMessage.value = 'Email is required.';
      }

      if (!password) {
        return errorMessage.value = 'Password is required.';
      }

      if (!confirmPassword) {
        return errorMessage.value = 'Confirm password is required.';
      }

      if (password !== confirmPassword) {
        return errorMessage.value = 'The passwords do not match.';
      }

      if (password !== confirmPassword) {
        return errorMessage.value = 'The password and confirm password do not match.'
      };

      const { data } = await axios.patch(`${import.meta.env.VITE_APP_API_URL}/users`, user.value);

      successMessage.value = data.message;
      showCard.value = true;
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage.value = error.response.data.message;
      }
    } finally {
      isLoading.value = false;
    }
  };

  const goToLogin = () => {
    router.push('/');
  }

</script>

<template>
  <div>
    <v-card
      v-if="!showCard"
      class="mx-auto pa-10 pt-13 pb-4 my-10"
      elevation="8"
      max-width="448"
      rounded="lg"
    >
      <v-card-title class="text-center text-h5 greet text-secondary mt-n7 mb-1">
       Change your password
      </v-card-title>
      <v-card-text class="text-medium-emphasis text-caption text-center">
        Enter a new password below to change your password.
      </v-card-text>
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
        <v-form :submit.prevent="resetPasswordFunctionality">
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
            label="New Password"
            placeholder="Enter your new password"
            variant="outlined"
            @click:append-inner="visible = !visible"
          ></v-text-field>
          <v-text-field
            v-model="user.confirmPassword"
            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
            :type="visible ? 'text' : 'password'"
            density="compact"
            label="Confirm new password"
            placeholder="Confirm your new password"
            variant="outlined"
            @click:append-inner="visible = !visible"
          ></v-text-field>
          <v-btn
            :loading="isLoading"
            :disabled="isLoading"
            class="mb-8"
            color="primary"
            size="large"
            block
            type="submit"
          >
            Change Password
          </v-btn>
          <v-btn color="secondary" @click="goToLogin" block size="large">
            Go to Sign in
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
    <v-card v-else class="mx-auto text-center pa-10 pt-13 pb-8 my-10"
      elevation="8"
      max-width="448"
      rounded="lg"
    >
      <v-icon color="success" size="64">mdi-check-circle</v-icon>
      <v-card-title class="text-h6 justify-center mt-4 text-secondary">{{ successMessage }}</v-card-title>
      <v-card-text>Your password has been successfully updated.</v-card-text>
      <v-btn color="primary" @click="goToLogin" block size="large" class="mt-4">
        Go to Sign in
      </v-btn>
    </v-card>
  </div>
</template>