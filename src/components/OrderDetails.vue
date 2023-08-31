<script setup lang="ts">
    import type { ProductCartType } from '@/tools/type';
    import { ref } from 'vue';
    const { products } = defineProps<{
        products: Array<ProductCartType>
    }>()
    const emits = defineEmits<{
        (e: 'remove', id: number): void
        (e: 'close'): void
        (e: 'confirm'): void
    }>()

    const scrollEnd = ref( products.length < 3 )
    const onScroll = (event: any) => {
        scrollEnd.value = event.target.scrollTop + event.target.offsetHeight === event.target.scrollHeight
    }
</script>

<template>
    <v-card
        max-height="500"
        v-scroll.self="onScroll"
        class="overflow-y-auto"
    >
        <h2 class="text-2xl text-center p-4 sticky top-0 bg-green-500 text-white border-b-2 shadow-md font-bold">Confirmar Pedido</h2>
        <v-card-text class="px-5">
            <div class="mt-8">
                <div>
                    <ul role="list" class="-my-6 divide-y divide-gray-200 border border-black">
                        <li v-for="product in products" :key="product.id" class="flex flex-col sm:flex-row py-2">
                            <div class="flex flex-row justify-between px-5">
                                <div class="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img
                                        :src="product.image"
                                        :alt="product.description.substring(0, 10)"
                                        class="h-full w-full object-cover object-center"
                                        lazy
                                    />
                                </div>
                                <div class="sm:hidden block">
                                    <h3 class="font-bold ">{{ product.name }}</h3>
                                    <p class="text-gray-500">Qty {{ product.quantity }}</p>
                                </div>
                            </div>

                            <div class="ml-4 flex flex-1 flex-col">
                                <div>
                                    <div class="flex justify-between text-base font-medium text-gray-900">
                                        <h3 class="font-bold hidden  sm:block">
                                            <p>{{ product.name }}</p>
                                        </h3>
                                        <p class="ml-4 flex flex-col items-end ">
                                            <span><span class="font-semibold">Precio:</span> {{ ' ' }}{{ product.quantity * product.price }}</span>
                                            <small><span class="font-semibold">Precio por Unidad:</span>{{ ' ' }}{{ product.price }}</small>
                                        </p>
                                    </div>
                                </div>
                                <div class="flex flex-1 items-end justify-between text-sm">
                                    <p class="text-gray-500 hidden sm:block">Qty {{ product.quantity }}</p>

                                    <div class="flex">
                                        <button type="button"
                                            @click="emits('remove', product.id)"
                                            class="font-medium py-1 px-2 text-green-600 hover:text-green-500 border hover:!border-green-500 rounded">Remove</button>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

        </v-card-text>
        <v-card-actions :class="'sticky bottom-0 bg-white mt-2 gap-2 sm:gap-10 px-5 pb-4 pt-3 ' + (scrollEnd ? '' : 'shadow-t-md') ">
            <v-spacer></v-spacer>
            <v-btn class="font-bold !text-blue-400 rounded !border !border-blue-400 hover:bg-blue-400 hover:!text-white" @click="emits('close')">Volver</v-btn>
            <v-btn class="font-bold !text-green-700 rounded !border !border-green-500 hover:bg-green-500 hover:!text-white" @click="emits('confirm')">Confirmar</v-btn>
        </v-card-actions>
    </v-card>
</template>