<script setup>
  import { RouterLink, RouterView } from 'vue-router';
  import { useUserStore } from '@/stores/user';
  import { storeToRefs } from 'pinia';
  import { useRoute } from 'vue-router';

  const useUser = useUserStore();
  const { user } = storeToRefs(useUser);
  const route = useRoute();
</script>

<template>
  <v-card v-if="!$route.meta.hideNavbar" class="mx-auto" color="grey-lighten-3" max-width="448">
    <v-layout>
      <v-app-bar
        color="primary"
      >
        <div class="d-flex align-center">
          <img
            alt="kameez"
            class="shrink mr-2 ml-2"
            contain
            src="@/assets/navbar-logo/logo.png" transition="scale-transition"
            width="60"
          />
        </div>
        <v-spacer></v-spacer>
        <span class="text-h6 mr-5">{{ user.firstName}} {{ user.lastName }}</span>
        <v-btn text @click="logout">
          <v-icon left>mdi-logout</v-icon>
          Log Out
        </v-btn>
      </v-app-bar>
      <v-main>
      </v-main>
    </v-layout>
  </v-card>
  <RouterView />
</template>
