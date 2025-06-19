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
  <v-container class="fill-height d-flex align-center justify-center">
        <v-card class="pa-6" style="width: 100%; max-width: 450px;">
          <v-card-title class="text-h4 text-center mb-6" style="color: #3F51B5;">Iniciar Sesión</v-card-title>

          <v-card-text>
            <v-form>
              <v-text-field
                v-model="email"
                label="Correo Electrónico"
                prepend-inner-icon="mdi-email"
                outlined
                dense
                class="mb-4"
              ></v-text-field>

              <v-text-field
                v-model="password"
                label="Contraseña"
                prepend-inner-icon="mdi-lock"
                :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPassword ? 'text' : 'password'"
                outlined
                dense
                class="mb-6"
              ></v-text-field>

              <v-btn
                type="submit"
                color="#3F51B5"
                block
                large
                class="mb-4"
                :loading="loading"
              >
                Iniciar Sesión
              </v-btn>

              <v-row justify="center">
                <v-col cols="auto">
                  <v-btn
                    variant="flat"
                    color="#ee6c4d"
                    size="small"
                  >
                    ¿Olvidaste tu contraseña?
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-container>
   <v-sheet border rounded max-width="90%" class="mx-auto mt-10">
    <v-data-table
      :headers="headers"
      :items="products"
    >
      <template v-slot:top>
        <v-toolbar flat color="secondary" rounded>
          <v-toolbar-title>
            <v-icon color="white" icon="mdi-book-multiple" size="x-small" start/>
            Products
          </v-toolbar-title>
          <v-btn
            class="me-2"
            prepend-icon="mdi-plus"
            color="primary"
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