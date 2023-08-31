<script setup lang="ts">
import type { ProductType } from '@/tools/type';

const { product, selected, quantity } = defineProps<{
    product: ProductType
    selected: boolean,
    quantity: number
}>()
const emits = defineEmits<{
    (e: 'add', id: number): void
    (e: 'remove', id: number): void
}>()

</script>

<template>
    <div :class="'group relative p-1 rounded-md shadow-md hover:shadow-lg ' + (selected ? 'bg-green-300 border-2 border-green-500' : 'border-2 border-white bg-white')">
        <div
            class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-40">
            <img :src="product.image" :alt="product.description"
                class="h-full w-full object-cover object-center lg:h-full lg:w-full" />
        </div>
        <div class="mt-4 flex justify-between">
            <div>
                <h3 class="text-sm text-gray-700">
                    <p>{{ product.name }}</p>
                </h3>
            </div>
            <p class="text-sm font-medium text-gray-900">{{ product.price }}</p>
        </div>
        <div class="flex flex-row justify-between items-center">
            <v-btn size="small" color="#E0E0E0" class="hover:!bg-red-300" @click="emits('remove', product.id)"
                icon="mdi-minus"></v-btn>
            <span>{{ quantity }}</span>
            <v-btn size="small" color="#E0E0E0" class="hover:!bg-blue-300" @click="emits('add', product.id)"
                icon="mdi-plus"></v-btn>
        </div>
    </div>
</template>