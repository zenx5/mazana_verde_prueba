<template>
    <div class="bg-white">
        <div class=" mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <h2 class="text-2xl font-bold tracking-tight text-gray-900">Selecciona tu pedido</h2>

            <div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-6 xl:gap-x-8">
                <div v-for="product in products" :key="product.id"
                    :class="'group relative p-1 rounded-md shadow-md hover:shadow-lg ' + (selection.includes(product.id) ? 'bg-green-300 border-2 border-green-500' : 'border-2 border-white bg-white')">
                    <div
                        class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-40">
                        <img :src="product.image" :alt="product.description"
                            class="h-full w-full object-cover object-center lg:h-full lg:w-full" />
                    </div>
                    <div class="mt-4 flex justify-between">
                        <div>
                            <h3 class="text-sm text-gray-700">
                                <a :href="product.href">
                                    <span aria-hidden="true" class="absolute inset-0" />
                                    {{ product.name }}
                                </a>
                            </h3>
                            <p class="mt-1 text-sm text-gray-500">{{ product.color }}</p>
                        </div>
                        <p class="text-sm font-medium text-gray-900">{{ product.price }}</p>
                    </div>
                    <div class="flex flex-row justify-between items-center">
                        <v-btn size="small" color="#E0E0E0" class="hover:!bg-red-300" @click="removeItems(product.id)"
                            icon="mdi-minus"></v-btn>
                        <span>{{ getQuantity(product.id) }}</span>
                        <v-btn size="small" color="#E0E0E0" class="hover:!bg-blue-300" @click="addItems(product.id)" icon="mdi-plus"></v-btn>
                    </div>
                </div>
            </div>
        </div>
        <div
            class="bg-white flex flex-row justify-between p-5 pt-10 mx-auto rounded-t-xl shadow-t-xl w-10/12 absolute bottom-0">
            <div class="px-5">
                <p>Hola <span class="font-semibold">Fulano</span>, aqui puedes ver el costo de tu pedido</p>
                <p class="flex flex-row gap-4">
                    <span class="font-bold">Total</span>
                    <span>{{ total }}</span>
                </p>
            </div>
            <div class="px-5">
                <v-btn color="green" @click="checkout" :disabled="selection.length==0">Confirmar</v-btn>
            </div>
        </div>
        <v-dialog v-model="modalCheckout" class="w-8/12">
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
                                <li v-for="product in getProductCart()" :key="product.id" class="flex py-2">
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
                    <v-btn class="font-bold !text-red-700 rounded !border !border-red-500 hover:bg-red-500 hover:!text-white" @click="modalCheckout = false">Cancelar</v-btn>
                    <v-btn class="font-bold !text-green-700 rounded !border !border-green-500 hover:bg-green-500 hover:!text-white" @click="confirmOrder">Confirmar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script setup lang="ts">
// Array con productos
import store from '@/store'
import FoodService from "@/services/FoodService";
import { ref } from "vue"
import type { ProductType, ProductCartType } from "@/tools/type"
const products = ref<Array<ProductType>>([])
const selection = ref<Array<Number>>([])
const total = ref<number>(0)
const modalCheckout = ref(false)
const scrollEnd = ref(false)



FoodService.get( store.state.token ).then(({data}) => {
    console.log(data)
    products.value = data
    console.log( products.value )
})

const addItems = (id: number) => {
    selection.value.push(id)
    calculateTotal()
}

const removeItems = (id: number) => {
    const elementIndex = selection.value.findIndex((item) => item === id)
    if (elementIndex === -1) return
    selection.value = selection.value.filter((item, index) => index !== elementIndex)
    calculateTotal()
}

const getQuantity = (id: number) => {
    return selection.value.filter((item) => item === id).length
}


const calculateTotal = () => {
    total.value = selection.value.reduce((acc, id) => {
        const product = products.value.find((item) => item.id === id)
        return acc + parseFloat(product.price)
    }, 0)
}

const checkout = () => {
    console.log(selection.value)
    modalCheckout.value = true
}

const getProductCart = () => {
    return selection.value.reduce((acc:Array<ProductCartType>, id) => {
        const product = products.value.find((item) => item.id === id)
        const index = acc.findIndex((item) => item.id === id)
        if (index === -1) {
            acc.push({
                ...product,
                price: parseFloat(product.price),
                quantity: getQuantity(id),
            })
        } else {
            acc[index].quantity = getQuantity(id)
        }
        return acc
    }, [])
}

const confirmOrder = () => {
    console.log('confirmar pedido')
}

const onScroll = (event: any) => {
    scrollEnd.value = event.target.scrollTop + event.target.offsetHeight === event.target.scrollHeight
}


</script>