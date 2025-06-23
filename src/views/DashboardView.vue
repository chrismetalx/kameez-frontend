<script setup>
  import { ref } from 'vue';
  import axios from 'axios';
  import ProductForm from '@/components/ProductForm.vue';

  const products = ref([]);
  const showModal = ref(false);

  const product = ref({
    id: null,
    name: '',
    price: 0,
    size: '',
    image: ''
  });

  const headers = [
    { title: 'Id', key: 'id', align: 'start' },
    { title: 'Name', key: 'name' },
    { title: 'Price', key: 'price' },
    { title: 'Size', key: 'size', align: 'end' },
    { title: 'Actions', key: 'actions', align: 'end', sortable: false },
  ];

  const getProducts = async () => {
    const { data } = await axios.get(`http://localhost:3000/product`);
    products.value = data;
  }

  const openAddDialog = () => {
    product.value = {
      id: null,
      name: '',
      price: 0,
      size: '',
      image: ''
    }
    showModal.value = true
  }

  const openEditDialog = (item) => {
    product.value = {...item}
    showModal.value = true
  }

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
    v-if="showModal"
  />
</template>