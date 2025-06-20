<script setup>
  import { ref } from 'vue';

  const products = ref([
    { id: 1, name: 'Kameez t-shirt', price: 10.01, size: 'M' },
    { id: 2, name: 'Kameez original', price: 5.00, size: 'L' },
    { id: 3, name: 'T-shirt edition A', price: 21.99, size: 'S' },
    { id: 4, name: 'T-shirt short sleeve', price: 31, size: 'XL' },
    { id: 5, name: 'T-shirt long sleeve', price: 17.25, size: 'SM' },
  ]);

  const headers = [
    { title: 'Id', key: 'id', align: 'start' },
    { title: 'Name', key: 'name' },
    { title: 'Price', key: 'price' },
    { title: 'Size', key: 'size', align: 'end' },
    { title: 'Actions', key: 'actions', align: 'end', sortable: false },
  ];
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
          >Add a Product</v-btn>
        </v-toolbar>
      </template>
      <template v-slot:item.actions>
        <div class="d-flex ga-2 justify-end">
          <v-btn color="warning" icon="mdi-pencil" size="small"/>
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
</template>