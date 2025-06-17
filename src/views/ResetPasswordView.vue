<script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import axios from 'axios';

  const visible = ref(false);
  const isLoading = ref(false);
  const errorMessage = ref('');
  const showCard = ref(false);
  const router = useRouter();

  const user = ref({
    email: "",
    newPassword: "",
    confirmNewPassword: ""
  });

  const resetPasswordFunctionality = async () => {
    isLoading.value = true;
    try {
      errorMessage.value = '';

      if (user.value.email === "" || user.value.newPassword === "" || user.value.confirmNewPassword === "") {
        throw new Error('All fields are required.');
      };

      if (user.value.newPassword !== user.value.confirmNewPassword) {
        throw new Error('The new password and confirm new password do not match.');
      };

      const { data } = await axios.get(`${import.meta.env.VITE_APP_API_URL}/user?email=${user.value.email}`);

      if (data.length === 0) {
        throw new Error('The email you entered does not have a user created.');
      };

      const userData = data[0].id;

      await axios.patch(`${import.meta.env.VITE_APP_API_URL}/user/${userData}`, {
        password: user.value.newPassword,
      });

      showCard.value = true;
    } catch (error) {
      errorMessage.value = error.message || 'An error ocurred.';
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
          class="mb-8"
          color="grey-lighten-2"
          border="start"
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
            v-model="user.newPassword"
            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
            :type="visible ? 'text' : 'password'"
            density="compact"
            label="New Password"
            placeholder="Enter your new password"
            variant="outlined"
            @click:append-inner="visible = !visible"
          ></v-text-field>
          <v-text-field
            v-model="user.confirmNewPassword"
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
            class="mb-4"
            color="primary"
            size="large"
            block
            type="submit"
          >
            Change Password
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
    <v-card v-else class="mx-auto text-center pa-6 mt-5"
      elevation="8"
      max-width="448"
      rounded="lg"
    >
      <v-icon color="success" size="64">mdi-check-circle</v-icon>
      <v-card-title class="text-h6 justify-center mt-4">Password Changed Successfully!</v-card-title>
      <v-card-text>Your password has been successfully updated.</v-card-text>
      <v-btn color="primary" @click="goToLogin" block large class="mt-4">
        Go to Sign in
      </v-btn>
    </v-card>
  </div>
</template>