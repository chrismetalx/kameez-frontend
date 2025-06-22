<script setup>
  import { ref, computed, defineProps, defineEmits } from 'vue';

  const props = defineProps({
    isEditing: Boolean,
    modelValue: Boolean,
    productData: {
      type: Object,
      default: () => ({
        id: null,
        name: '',
        price: 0,
        size: '',
        image: ''
      })
    }
  });

  const form = ref(null);
  const saving = ref(false);
  const product = ref({...props.productData});
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
      product.value.image = e.target.result;
    };
    reader.readAsDataURL(file);
  } else {
    product.value.image = '';
  }
  };

  const closeDialog = () => {
    dialog.value = false;
    emit('update:modelValue', false);
  };

  const saveProduct = async() => {
    const { valid } = await form.value.validate();
    if (valid) {
      saving.value = true;
      emit('save', product.value);
      closeDialog();
    }
  };
</script>

<template>
  <div class="pa-4 text-center">
    <v-dialog
      v-model="dialog"
      max-width="600"
      persistent
      class="pt-5"
      @click:outside="closeDialog"
    >
      <v-card>
        <v-toolbar class="mb-5" color="primary">
          <v-toolbar-title>
            <p class="text-white">
              <v-icon color="white" :icon="isEditing? 'mdi-package-variant' : 'mdi-book-multiple'" size="small"></v-icon>
              {{ isEditing? 'Update' : 'Add Product' }}
            </p>
          </v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form ref="form" @submit.prevent="saveProduct">
            <v-row dense>
              <v-col cols="12">
                <v-text-field
                  v-model="product.name"
                  label="Name*"
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
                  :rules="priceRules"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  v-model="product.size"
                  label="Size*"
                  :rules="sizeRules"
                  :items="['S', 'M', 'L', 'XL']"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-file-input
                  v-model="imageFile"
                  :rules="imageRules"
                  label="Product Image"
                  accept="image/*"
                  prepend-icon="mdi-camera"
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
            </v-row>
            <small class="text-caption text-medium-emphasis">*indicates required field</small>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                text="Cancel"
                variant="flat"
                color="secondary"
                @click="closeDialog"
              ></v-btn>
              <v-btn
                color="primary"
                variant="flat"
                :text="isEditing ? 'Update' : 'Add'"
                type="submit"
                :loading="saving"
                :disabled="saving"
              ></v-btn>
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>