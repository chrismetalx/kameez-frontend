<script setup>
  import { ref } from 'vue';
  import axios from 'axios';
  import ProductForm from '@/components/ProductForm.vue';
  import { useToast } from '../composables/useToast';
  import ProductRemove from '@/components/ProductRemove.vue';
  import { useRouter } from 'vue-router';

  const { showToast } = useToast();
  const products = ref([]);
  const showModal = ref(false);
  const alertMessage = ref(false);
  const saveLoading = ref(false);
  const router = useRouter();

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
    const { data } = await axios.get(`${import.meta.env.VITE_APP_API_URL}/product`);
    products.value = data;
  };

  const openAddDialog = () => {
    product.value = {
      id: null,
      stock: '',
      name: '',
      price: 0,
      size: '',
      image: '',
      description: ''
    }
    showModal.value = true;
    alertMessage.value = false;
  };

  const goToProductView = (event, { item }) => {
    router.push(`/dashboard/${item.id}`)
  }

  const openEditDialog = (item) => {
    product.value = {...item}
    showModal.value = true;
    alertMessage.value = false;
  };

  const handleEdit =  async(product) => {
    alertMessage.value = false;
    saveLoading.value = true;
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_APP_API_URL}/product?name=${product.name}`);
      if (data.length && data[0].id !== product.id) {
        alertMessage.value = true;
        saveLoading.value = false;
      } else {
        await axios.put(`${import.meta.env.VITE_APP_API_URL}/product/${product.id}`, product);
        showToast('Product edited successfully!', 'success');
        getProducts();
        showModal.value = false;
      }
    } catch (error) {
      console.log(error);
    } finally {
      saveLoading.value = false;
    }
  };

  const handleCreate =  async(product) => {
    alertMessage.value = false;
    saveLoading.value = true;
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_APP_API_URL}/product?name=${product.name}`);
      if (data.length) {
        alertMessage.value = true;
        saveLoading.value = false;
      } else {
        await axios.post(`${import.meta.env.VITE_APP_API_URL}/product`, product);
        showToast('Product created successfully!', 'success');
        getProducts();
        showModal.value = false;
      }
    } catch (error) {
      console.log(error);
    } finally {
      saveLoading.value = false;
    }
  };

  const handleRemove = async(product) => {
    saveLoading.value = true;
    try {
      await axios.delete(`${import.meta.env.VITE_APP_API_URL}/product/${product.id}`)
      showToast('Product removed successfully!', 'success');
      getProducts();
    } catch (error) {
      console.log(error);
    } finally {
      saveLoading.value = false;
    }
  };

  const handleSave = (product) => {
    if (product.id) {
      handleEdit(product);
    } else {
      handleCreate(product);
    }
  };

  getProducts();
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
    :alertMessage="alertMessage"
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