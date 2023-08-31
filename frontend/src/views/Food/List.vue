<script setup lang="ts">
import { ref } from "vue"
import store from '@/store'
import FoodService from "@/services/FoodService";
import type { ProductType, ProductCartType } from "@/tools/type"
import OrderDetails from '@/components/OrderDetails.vue';
import OrderSuccess from '@/components/OrderSuccess.vue';
import ProductCard from "@/components/ProductCard.vue";
import DetailFooter from "@/components/DetailFooter.vue";

const NONE = 0
const ORDER_DETAILS = 1
const ORDER_SUCCESS = 2

const products = ref<Array<ProductType>>([])
const selection = ref<Array<Number>>([])
const total = ref<number>(0)
const username = ref<string>(store.state.user.name)
const open = ref(false)
const modal = ref(NONE)

FoodService.get(store.state.token).then(({ data }) => {
    console.log(data)
    products.value = data
    console.log(products.value)
})

const addItems = (id: number) => {
    selection.value.push(id)
    calculateTotal()
}

const removeItems = (id: number) => {
    const elementIndex = selection.value.findIndex((item) => item === id)
    if (elementIndex === -1) return
    selection.value = selection.value.filter((item, index) => index !== elementIndex)
    if (selection.value.length === 0) open.value = false
    calculateTotal()
}

const getQuantity = (id: number) => {
    return selection.value.filter((item) => item === id).length
}


const calculateTotal = () => {
    total.value = selection.value.reduce((acc: number, id) => {
        const product: ProductType = products.value.find((item) => item.id === id) as ProductType
        console.log(acc, product.price as number)
        return acc + product.price
    }, 0)
}

const checkout = () => {
    open.value = true
    modal.value = ORDER_DETAILS
}

const getProductCart = () => {
    return selection.value.reduce((acc: Array<ProductCartType>, id) => {
        const product: ProductType = products.value.find((item) => item.id === id) as ProductType
        const index = acc.findIndex((item) => item.id === id)
        if (index === -1) {
            acc.push({
                ...product,
                price: product.price,
                quantity: getQuantity(id as number),
            })
        } else {
            acc[index].quantity = getQuantity(id as number)
        }
        return acc
    }, [])
}

const confirmOrder = () => {
    selection.value = []
    total.value = 0
    open.value = true
    modal.value = ORDER_SUCCESS
}
</script>

<template>
    <div>
        <div class=" mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <h2 class="text-2xl font-bold tracking-tight text-gray-900">Selecciona tu pedido</h2>

            <div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-4">
                <ProductCard
                    v-for="product in products"
                    :key="product.id"
                    :product="product"
                    :selected="selection.includes(product.id)"
                    :quantity="getQuantity(product.id)"
                    @add="addItems(product.id)"
                    @remove="removeItems(product.id)"
                ></ProductCard>
            </div>
        </div>
        <DetailFooter :username="username" :total="total" :disabled="selection.length===0" @checkout="checkout"/>
        <v-dialog v-model="open" class="w-full sm:w-8/12">
            <OrderDetails v-show="modal === ORDER_DETAILS" :products="getProductCart()" @confirm="confirmOrder"
                @close="() => open = false" @remove="id => removeItems(id)"></OrderDetails>
            <OrderSuccess v-show="modal === ORDER_SUCCESS" :username="username" @close="() => { open = false }"></OrderSuccess>
        </v-dialog>
    </div>
</template>
