<script setup>
  import { ref } from 'vue';
  import axios from 'axios';
  import ModalProducts from '@/components/ModalProducts.vue';

  // const products = ref([
  //   { id: 1, name: 'Kameez t-shirt', price: 10.01, size: 'M' },
  //   { id: 2, name: 'Kameez original', price: 5.00, size: 'L' },
  //   { id: 3, name: 'T-shirt edition A', price: 21.99, size: 'S' },
  //   { id: 4, name: 'T-shirt short sleeve', price: 31, size: 'XL' },
  //   { id: 5, name: 'T-shirt long sleeve', price: 17.25, size: 'SM' },
  // ]);
  const products = ref([]);
  const showModal = ref(false)
  const isEditing = ref(false);

  const defaultProduct = ref({
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
    defaultProduct.value = {
      id: null,
      name: '',
      price: 0,
      size: '',
      image: ''
    }
    isEditing.value = false
    showModal.value = true
  }

  const openEditDialog = (product) => {
    defaultProduct.value = {...product}
    isEditing.value = true
    showModal.value = true
    console.log(product);
  }

  getProducts();

  const saveValues = async(product) => {
    try {
      console.log(product);
      if (isEditing.value) {
        await axios.put(`http://localhost:3000/product/${product.id}`, product)
        getProducts();
      } else {
        await axios.post(`http://localhost:3000/product`, product)
      }
    } catch (error) {
      console.log(error);
    }
  }

  saveValues();

</script>

<template>
  <v-sheet border rounded max-width="90%" class="mx-auto mt-10 my-table">
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
  <ModalProducts
    v-model="showModal"
    :productData="defaultProduct"
    :isEditing="isEditing"
    @save="saveValues"
    v-if="showModal"
  />
</template>