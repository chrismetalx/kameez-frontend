<script setup>
  import { onMounted, ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useApi } from '@/composables/useApi';

  const route = useRoute();
  const router = useRouter();
  const { data, execute } = useApi();
  const product = ref({});

  const back = () => {
    router.push('/dashboard');
  };

  const showProductData = async () => {
    await execute('GET', `/products/${route.params.id}`);
    if (data.value) {
      product.value = data.value.data;
    }
  };

  onMounted(() => {
    showProductData();
  })
</script>

<template>
  <v-container class="d-flex flex-column justify-center align-center min-h-screen">
    <v-card class="product-card" elevation="8" rounded="lg">
      <v-toolbar class="px-0 pt-5" color="primary">
        <v-toolbar-title>
          <v-card-title class="d-flex align-center mb-6">
            <v-icon icon="mdi-cube-outline" size="large" class="mr-2"></v-icon>
            <span class="text-h5 font-weight-bold">Product Details</span>
          </v-card-title>
        </v-toolbar-title>
      </v-toolbar>
      <v-row no-gutters>
        <v-col cols="12" md="6" class="d-flex align-center">
          <v-img
            :src="product.image"
            :alt="product.name"
            class="product-image"
            cover
            height="100%"
            min-height="400px"
          ></v-img>
        </v-col>
        <v-col cols="12" md="6" class="pa-6 d-flex flex-column">
          <div class="mb-6">
            <h2 class="text-h3 font-weight-bold mb-2 pb-2 text-gradient">
              {{ product.name }}
            </h2>
            <v-divider thickness="2" class="border-opacity-50 my-3"></v-divider>
          </div>
          <div class="d-flex align-center mb-6 bg-grey-lighten-4 pa-4 rounded-lg">
            <v-icon icon="mdi-tag-outline" size="large" class="mr-3 text-primary"></v-icon>
            <span class="text-h4 font-weight-bold text-primary">${{ product.price }}</span>
          </div>
          <div class="mb-8">
            <h3 class="text-h5 font-weight-medium mb-3">Description</h3>
            <p class="text-body-1" style="white-space: pre-line;">{{ product.description }}</p>
          </div>
          <div class="d-flex flex-wrap align-center gap-4 mb-8">
             <div class="d-flex align-center bg-grey-lighten-4 pa-3 rounded-lg">
              <span class="text-h5">Size: {{ product.size }}</span>
            </div>
            <v-chip
              :color="product.stock ? 'green' : 'red'"
              variant="flat"
              size="large"
              class="ml-3"
            >
              <v-icon :icon="product.stock ? 'mdi-check' : 'mdi-close'" class="mr-2"></v-icon>
              {{ product.stock ? 'In stock' : 'Out of stock' }}
            </v-chip>
          </div>
          <v-card-actions class="mt-auto px-0">
            <v-btn
              color="secondary"
              @click="back"
              variant="flat"
              prepend-icon="mdi-arrow-left"
              size="large"
              block
            >
              Back to Dashboard
            </v-btn>
          </v-card-actions>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<style scoped>
  .text-gradient {
    background: linear-gradient(50deg, #3F51B5, #ee6c4d);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .min-h-screen {
    min-height: calc(100vh - 64px);
  }

  .product-card {
    max-width: 900px;
    width: 100%;
  }

  .product-image {
    border-radius: 8px 0 0 8px;
  }

  /* Responsive para pantallas pequeñas */
  @media (max-width: 960px) {
    .product-image {
      border-radius: 8px 8px 0 0;
      min-height: 300px;
    }
    .v-card-title {
      font-size: 1.75rem !important;
    }
    h2 {
      font-size: 1.5rem !important;
    }
  }
</style>