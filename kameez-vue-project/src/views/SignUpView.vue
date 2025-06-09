<script setup>
  import { ref } from 'vue'
  import { toast } from 'vue3-toastify';
  const visible = ref(false)
  const terms = ref(false)
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
      <v-card-title class="text-left text-h5 greet text-secondary ml-n1 mt-n7">
        Adventure starts here 🚀
        <v-icon size="64px" color="green-darken-1" icon="fas fa-wave"></v-icon> 
      </v-card-title>

      <v-card-text>
      <v-form>
        
        <v-text-field 
          label="First Name"
          type="text" 
          required  
          density="compact"
          placeholder="John"
          variant="outlined"
        ></v-text-field>

        <v-text-field
          label="Last Name"
          density="compact"
          placeholder="Doe"
          variant="outlined"
          type="text"
        ></v-text-field>

        <v-text-field
          label="Email address"
          density="compact"
          placeholder="JohnDoe@email.com"
          variant="outlined"
          type="email"
        ></v-text-field>

        <v-text-field
          label="Password"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          density="compact"
          placeholder="Enter your password"
          variant="outlined"
          @click:append-inner="visible = !visible"
        ></v-text-field>

        <v-text-field
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
        <router-link to="/" class="ml-5 text-primary text-decoration-none">Sign in instead</router-link>
      </span>
    </v-card-actions>
    </v-card>
  </div>
</template>

<style scoped>
  
</style>
