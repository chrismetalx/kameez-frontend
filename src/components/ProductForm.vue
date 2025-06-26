<script setup>
  import { ref, computed, defineProps, defineEmits } from 'vue';

  const props = defineProps({
    modelValue: Boolean,
    loading: Boolean,
    alertMessage: Boolean,
    product: {
      type: Object,
    }
  });

  const form = ref(null);
  const imageFile = ref(null);

  // Reglas de validación
  const nameRules = [
    v => !!v || 'Name is required',
    v => (v && v.length >= 3) || 'Name must be at least 3 characters'
  ];

  const priceRules = [
    v => !!v || 'Price is required',
    v => (v && v > 0) || 'Price must be greater than 0'
  ];

  const sizeRules = [
    v => !!v || 'Size is required'
  ];

  const imageRules = [
    (v) => !!v || 'Image is required',
    (v) => !v || ['image/jpeg', 'image/png', 'image/webp'].includes(v.type) || 'Only images are allowed JPG, PNG o WEBP'
  ];

  const descriptionRules = [
    v => !!v || 'Description is required',
    v => (v && v.length >= 6) || 'Description must be at least 6 characters'
  ];

  const emit = defineEmits(['update:modelValue', 'save']);

  const dialog = computed({
    get: () => props.modelValue,
    set: (val) => emit('update:modelValue', val)
  });

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        props.product.image = e.target.result;
      };
      reader.readAsDataURL(file);
    } else {
      props.product.image = '';
    }
  };

  const closeDialog = () => {
    dialog.value = false;
    emit('update:modelValue', false);
  };

  const saveProduct = async() => {
    const { valid } = await form.value.validate();
    if (valid) {
      emit('save', props.product);
    }
  };
</script>

<template>
  <div class="pa-4 text-center">
    <v-dialog
      v-model="dialog"
      max-width="500"
      rounded="lg"
      persistent
      class="pt-5"
      @click:outside="closeDialog"
    >
      <v-card>
        <v-toolbar class="mb-5 px-0" color="primary">
          <v-toolbar-title>
            <p class="text-white">
              <v-icon color="white" :icon="product.id? 'mdi-package-variant' : 'mdi-book-multiple'" size="small"></v-icon>
              {{ product.id? 'Update' : 'Add Product' }}
            </p>
          </v-toolbar-title>
        </v-toolbar>
        <v-card-text class="pa-15 pt-0 pb-4">
          <v-card-text class="py-0 mb-5 px-0">
            <small class="text-caption text-error">* Indicates required field.</small>
            <br>
            <small class="text-caption text-error">* Name field should be unique.</small>
          </v-card-text>
          <v-alert
            v-if="alertMessage"
            type="warning"
            class="mb-8"
            color="grey-lighten-2"
            border="start"
          >
            <p class="text-body-2">A product already exist with this name.</p>
          </v-alert>
          <v-form ref="form" @submit.prevent="saveProduct">
            <v-row dense>
              <v-col cols="12">
                <v-text-field
                  v-model="product.name"
                  label="Name*"
                  density="compact"
                  placeholder="T-shirt"
                  variant="outlined"
                  :rules="nameRules"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="product.price"
                  label="Price*"
                  type="number"
                  prefix="$"
                  density="compact"
                  placeholder="10"
                  variant="outlined"
                  :rules="priceRules"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="product.description"
                  label="Description"
                  :rules="descriptionRules"
                  density="compact"
                  placeholder="Enter product description"
                  variant="outlined"
                  rows="3"
                  auto-grow
                  counter
                  :maxlength="500"
                ></v-textarea>
              </v-col>
              <v-col cols="12">
                <v-select
                  v-model="product.size"
                  label="Size*"
                  density="compact"
                  placeholder="Select a size"
                  variant="outlined"
                  :rules="sizeRules"
                  :items="['XS', 'S', 'M', 'L', 'XL', 'XXL']"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-file-input
                  :v-model="product.id ? imageFile : ''"
                  :rules="product.id ? '': imageRules"
                  label="Product Image"
                  density="compact"
                  variant="outlined"
                  accept="image/*"
                  append-inner-icon="mdi-camera"
                  prepend-icon=""
                  class="cursor-pointer-input"
                  required
                  @change="handleImageUpload"
                ></v-file-input>
                <v-img
                  v-if="product.image"
                  :src="product.image"
                  max-height="150"
                  contain
                  class="mt-2"
                ></v-img>
              </v-col>
              <v-col cols="12">
                <div class="d-flex justify-space-between align-center mb-3">
                  <v-checkbox
                    v-model="product.stock"
                    label="In stock"
                    color="primary"
                    hide-details
                  ></v-checkbox>
                </div>
              </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                text="Cancel"
                variant="flat"
                color="secondary"
                size="large"
                @click="closeDialog"
              ></v-btn>
              <v-btn
                color="primary"
                variant="flat"
                :text="product.id ? 'Update' : 'Add'"
                type="submit"
                size="large"
                :loading="loading && !alertMessage"
                :disabled="loading && !alertMessage"
              ></v-btn>
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<style scoped>
  .cursor-pointer-input {
    cursor: pointer;
  }
</style>