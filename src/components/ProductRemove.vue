<script setup>
  import { defineProps, ref, defineEmits } from 'vue';
  const props = defineProps({
    loading: Boolean,
    itemProduct: {
      type: Object,
    }
  });

  const emit = defineEmits('deleteProduct');

  const saveProduct = () => {
    emit('deleteProduct', props.itemProduct)
  }
</script>

<template>
  <div class="text-center">
    <v-dialog max-width="500" rounded="lg">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          v-bind="activatorProps"
          color="error"
          icon="mdi-delete"
          size="small"
        ></v-btn>
      </template>
      <template v-slot:default="{ isActive }">
        <v-card>
          <v-toolbar class="mb-5 px-0" color="primary"> <v-toolbar-title>
              <p class="text-white">
                <v-icon color="white" icon="mdi-delete" size="small"></v-icon>
                Delete Product </p>
            </v-toolbar-title>
          </v-toolbar>
          <v-card-title class="text-h6 text-center px-11">
            Are you sure you want to delete the product?
          </v-card-title>
          <v-card class="pa-15 pt-0 pb-4">
            <v-card-text class="text-medium-emphasis text-caption text-center">
              This action will remove your product from the product table.
            </v-card-text>
            <v-card-actions class="mt-5">
              <v-spacer></v-spacer>
              <v-btn
                text="Cancel" variant="flat"
                color="secondary"
                size="large"
                @click="isActive.value = false"
              ></v-btn>
              <v-btn
                :loading="loading"
                :disabled="loading"
                color="primary" text="Delete" variant="flat"
                size="large"
                @click="saveProduct"
              ></v-btn>
            </v-card-actions>
          </v-card>
        </v-card>
      </template>
    </v-dialog>
  </div>
</template>