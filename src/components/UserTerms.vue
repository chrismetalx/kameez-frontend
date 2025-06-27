<script setup>
  import { defineProps } from 'vue';
  const props = defineProps({
    loading: Boolean,
  });
</script>

<template>
  <div class="text-center">
    <v-dialog max-width="500" rounded="lg">
      <template v-slot:activator="{ props: activatorProps }">
        <a class="text-decoration-none cursor-pointer text-secondary" v-bind="activatorProps">I agree to privacy policy & terms</a>
      </template>
      <template v-slot:default="{ isActive }">
        <v-card>
          <v-toolbar class="mb-5 px-0" color="primary"> <v-toolbar-title>
              <p class="text-white">
                <v-icon color="white" icon="mdi-shield-account" size="small"></v-icon>
                Privacy Policy and Terms of Service </p>
            </v-toolbar-title>
          </v-toolbar>
          <v-card class="pa-15 pt-0 pb-4">
            <div class="bg-grey-lighten-4 rounded-lg">
              <v-card-text class="text-body-1 text-justify">
                By using this service, you agree to comply with these terms,
                user-generated content must comply with our community standards
                we reserve the right to suspend accounts that violate these terms
                the service is provided 'as is' without explicit or implied warranties
                users are responsible for maintaining the confidentiality of their credentials
                we reserve the right to modify these terms with prior notice.
              </v-card-text>
            </div>
            <v-card-actions class="mt-5">
              <v-spacer></v-spacer>
              <v-btn
                :loading="loading"
                :disabled="loading"
                color="primary" text="Close" variant="flat"
                size="large"
                @click="isActive.value = false"
              ></v-btn>
            </v-card-actions>
          </v-card>
        </v-card>
      </template>
    </v-dialog>
  </div>
</template>