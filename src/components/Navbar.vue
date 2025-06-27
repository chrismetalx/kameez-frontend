<script setup>
  import { storeToRefs } from 'pinia';
  import { useUserStore } from '@/stores/user';
  import { useRouter } from 'vue-router';

  const useUser = useUserStore();
  const { user } = storeToRefs(useUser);
  const router = useRouter();

  const logout = () => {
    useUser.resetState();
    router.push('/');
  }
</script>

<template>
   <v-card class="mx-auto" color="grey-lighten-3" max-width="448">
    <v-layout>
      <v-app-bar
        color="primary"
        class="px-lg-15"
      >
        <div class="d-flex align-center">
          <img
            alt="kameez"
            class="shrink mr-2 ml-2"
            contain
            src="@/assets/navbar-logo/logo.png" transition="scale-transition"
            width="90"
          />
        </div>
        <v-spacer></v-spacer>
        <span class="text-h6 mr-5">{{ user.firstName}} {{ user.lastName }}</span>
        <v-btn @click="logout" text color="secondary" variant="flat">
          <v-icon left>mdi-logout</v-icon>
          LogOut
        </v-btn>
      </v-app-bar>
      <v-main>
      </v-main>
    </v-layout>
  </v-card>
</template>