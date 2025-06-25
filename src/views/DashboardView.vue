<script setup>
  import { ref } from 'vue';
  import axios from 'axios';
  import ProductForm from '@/components/ProductForm.vue';
  import { useToast } from '../composables/useToast';

  const { showToast } = useToast();
  const products = ref([]);
  const showModal = ref(false);
  const alertMessage = ref(false);
  const saveLoading = ref(false);

  const product = ref({
    id: null,
    stock: '',
    name: '',
    price: 0,
    size: '',
    image: ''
  });

  const headers = [
    { title: 'Id', key: 'id', align: 'start' },
    { title: 'In stock', key: 'stock', align: 'start' },
    { title: 'Name', key: 'name' },
    { title: 'Price', key: 'price' },
    { title: 'Size', key: 'size', align: 'end' },
    { title: 'Actions', key: 'actions', align: 'end', sortable: false },
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
      image: ''
    }
    showModal.value = true;
    alertMessage.value = false;
  };

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
  <v-sheet border rounded max-width="90%" class="mx-auto mt-10 my-table mb-10">
    <v-data-table
      :headers="headers"
      :items="products"
    >
      <template v-slot:top>
        <v-toolbar flat color="primary" rounded>
          <v-toolbar-title>
            <p class="text-white">
              <v-icon color="white" icon="mdi-book-multiple" size="x-small" start/>
              Products
            </p>
          </v-toolbar-title>
          <v-btn
            class="me-2"
            prepend-icon="mdi-plus"
            color="secondary"
            variant="flat"
            border
            @click="openAddDialog"
          >Add a Product</v-btn>
        </v-toolbar>
      </template>
      <template v-slot:item.stock="{ item }">
        <v-chip
          :color="item.stock ? 'green' : 'red'"
          variant="elevated"
          size="small"
        >
          {{ item.stock ? 'Active' : 'Inactive' }}
        </v-chip>
      </template>
      <template v-slot:item.actions="{ item }">
        <div class="d-flex ga-2 justify-end">
          <v-btn color="warning" icon="mdi-pencil" size="small" @click="openEditDialog(item)"/>
          <v-btn color="error" icon="mdi-delete" size="small"/>
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