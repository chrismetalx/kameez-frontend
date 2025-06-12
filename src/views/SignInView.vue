<script setup>
  import { ref } from 'vue'
  import { toast } from 'vue3-toastify';
  const visible = ref(false)
  const rememberMe = ref(false)
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
        Welcome to Kameez! 👋 TEST DEPLOY
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field
            density="compact"
            type="email"
            label="Email address"
            placeholder="JohnDoe@email.com"
            variant="outlined"
          ></v-text-field>
          <v-text-field
            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
            :type="visible ? 'text' : 'password'"
            density="compact"
            label="Password"
            placeholder="Enter your password"
            variant="outlined"
            @click:append-inner="visible = !visible"
          ></v-text-field>       
          <div class="d-flex justify-space-between align-center mb-3">
            <v-checkbox
              v-model="rememberMe"
              label="Remember me"
              color="primary"
              hide-details
            ></v-checkbox>
            <a href="#" class="text-decoration-none text-primary">Forgot Password?</a>
          </div>
          <v-btn
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
        <router-link to="/sign-up" class="ml-5 text-primary text-decoration-none">Create an account</router-link>
      </span>
    </v-card-actions>
    </v-card>
  </div>
</template>
