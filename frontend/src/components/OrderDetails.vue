<template>
    <v-dialog v-model="openModal" class="w-8/12">
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
                                <li v-for="product in products" :key="product.id" class="flex py-2">
                                    <div class="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                        <img
                                            :src="product.image"
                                            :alt="product.description.substring(0, 10)"
                                            class="h-full w-full object-cover object-center"
                                            lazy
                                        />
                                    </div>

                                    <div class="ml-4 flex flex-1 flex-col">
                                        <div>
                                            <div class="flex justify-between text-base font-medium text-gray-900">
                                                <h3 class="font-bold">
                                                    <a :href="product.href">{{ product.name }}</a>
                                                </h3>
                                                <p class="ml-4 flex flex-col items-end ">
                                                    <span><span class="font-semibold">Precio:</span> {{ ' ' }}{{ product.quantity * product.price }}</span>
                                                    <small><span class="font-semibold">Precio por Unidad:</span>{{ ' ' }}{{ product.price }}</small>
                                                </p>
                                            </div>
                                            <p class="mt-1 text-sm text-gray-500">{{ product.color }}</p>
                                        </div>
                                        <div class="flex flex-1 items-end justify-between text-sm">
                                            <p class="text-gray-500">Qty {{ product.quantity }}</p>

                                            <div class="flex">
                                                <button type="button"
                                                    class="font-medium py-1 px-2 text-green-600 hover:text-green-500 border hover:!border-green-500 rounded">Remove</button>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                </v-card-text>
                <v-card-actions :class="'sticky bottom-0 bg-white mt-2 gap-10 px-5 pb-4 pt-3 ' + (scrollEnd ? '' : 'shadow-t-md') ">
                    <v-spacer></v-spacer>
                    <v-btn class="font-bold !text-red-700 rounded !border !border-red-500 hover:bg-red-500 hover:!text-white" @click="closeModal">Cancelar</v-btn>
                    <v-btn class="font-bold !text-green-700 rounded !border !border-green-500 hover:bg-green-500 hover:!text-white" @click="confirmOrder">Confirmar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
</template>

<script setup lang="ts">
    
import { ref } from 'vue'
    const scrollEnd = ref(false)
    const openModal = ref(false)
    const products = ref([])

    const props = defineProps({
        open: Boolean,
        confirmOrder: Function,
        closeModal: Function,
        products: []
    })

    const emits = defineEmits(['close-modal', 'confirm-order'])

    openModal.value = props.open
    products.value = props.products

    const closeModal = () => {
        // openModal.value = false
        props.closeModal()
    }

    const confirmOrder = () => {
        // openModal.value = false
        emits['confirm-order']()
    }

    const onScroll = (event: any) => {
        scrollEnd.value = event.target.scrollTop + event.target.offsetHeight === event.target.scrollHeight
    }
</script>