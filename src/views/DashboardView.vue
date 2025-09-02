<script setup>
  import { onMounted, ref } from 'vue';
  import ProductForm from '@/components/ProductForm.vue';
  import { useToast } from '../composables/useToast';
  import ProductRemove from '@/components/ProductRemove.vue';
  import { useRouter } from 'vue-router';
  import { useApi } from '@/composables/useApi';

  const { showToast } = useToast();
  const router = useRouter();

  const { data, error, saveLoading, execute } = useApi();

  const products = ref([]);
  const showModal = ref(false);
  const product = ref({
    id: null,
    stock: '',
    name: '',
    price: 0,
    size: '',
    image: '',
    description: ''
  });

  const headers = [
    { title: 'Id', key: 'id', width: '10%' },
    { title: 'Name', key: 'name', width: '30%' },
    { title: 'Price', key: 'price', width: '15%' },
    { title: 'Size', key: 'size', width: '15%', align: 'center' },
    { title: 'Stock', key: 'stock', width: '15%', align: 'center' },
    { title: 'Actions', key: 'actions', width: '15%', align: 'end', sortable: false },
  ];

  const getProducts = async () => {
    await execute('GET', '/products');
    if (data.value) {
      products.value = data.value.data;
    }
  };

  const openAddDialog = () => {
    error.value = '';
    product.value = {
      id: null,
      stock: '',
      name: '',
      price: 0,
      size: '',
      image: '',
      description: ''
    };
    showModal.value = true;
  };

  const goToProductView = (event, { item }) => {
    router.push(`/dashboard/${item.id}`);
  };

  const openEditDialog = (item) => {
    error.value = '';
    product.value = { ...item };
    showModal.value = true;
  };

  const handleRemove = async (product) => {
    await execute('DELETE', `/products/${product.id}`);
    if (data.value) {
      showToast(data.value.message, 'success');
      getProducts();
    }
  };

  const handleSave = async (product) => {
    if (product.id) {
      await execute('PUT', `/products/${product.id}`, product);
      if (data.value) {
        showToast(data.value.message, 'success');
        getProducts();
        showModal.value = false;
      }
    } else {
      await execute('POST', '/products', product);
      if (data.value) {
        showToast(data.value.message, 'success');
        getProducts();
        showModal.value = false;
      }
    }
  };

  onMounted(() => {
    getProducts();
  });
</script>

<template>
  <v-sheet border rounded max-width="100%" class="mx-lg-15 mt-10 my-table mb-10 table-product">
    <v-toolbar flat color="primary" rounded class="mb-4">
      <v-toolbar-title>
        <p class="text-white">
          <v-icon color="white" icon="mdi-book-multiple" size="x-small" start/>
          Products
        </p>
      </v-toolbar-title>
      <v-btn
        class="me-5"
        prepend-icon="mdi-plus"
        color="secondary"
        variant="flat"
        border
        @click="openAddDialog"
      >Add a Product</v-btn>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="products"
      hover
      @click:row="goToProductView"
      class="px-3"
    >
      <template v-slot:item.stock="{ item }">
        <div class="d-flex justify-center">
          <v-chip
            :color="item.stock ? 'green' : 'red'"
            variant="elevated"
            size="small"
          >
            {{ item.stock ? 'In stock' : 'Out of stock' }}
          </v-chip>
        </div>
      </template>
      <template v-slot:item.actions="{ item }">
        <div class="d-flex ga-2 justify-end" @click.stop>
          <v-btn color="warning" icon="mdi-pencil" size="small" @click="openEditDialog(item)"/>
          <ProductRemove :itemProduct="item" @deleteProduct="handleRemove" :loading="saveLoading"/>
        </div>
      </template>
      <template v-slot:no-data>
        <v-btn
          prepend-icon="mdi-backup-restore"
          rounded="lg"
          text="Reset data"
          variant="text"
          border
        />
      </template>
    </v-data-table>
  </v-sheet>
  <ProductForm
    v-model="showModal"
    :product="product"
    :loading="saveLoading"
    :alertMessage="!!error"
    :errorMessage="error ? error.message : ''"
    @save="handleSave"
  />
</template>

<style scoped>
  .v-data-table__tr .d-flex.justify-end {
    cursor: default;
  }

  @media (max-width: 960px) {
    .table-product {
      margin-left: 1rem;
      margin-right: 1rem;
    }
  }
</style>