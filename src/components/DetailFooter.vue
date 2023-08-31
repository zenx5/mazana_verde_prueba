<script setup lang="ts">
const { username, total, disabled } = defineProps<{
    username: string,
    total: number
    disabled: boolean
}>()
const emits = defineEmits<{
    (e: 'checkout'): void
}>()
</script>

<template>
    <div
        class="bg-white flex flex-col sm:flex-row justify-between p-5 pt-10 mx-auto rounded-t-xl shadow-t-xl w-10/12 absolute bottom-0 ">
        <div class="px-5">
            <p>Hola <span class="font-semibold">{{ username }}</span>, aqui puedes ver el costo de tu pedido</p>
            <p class="flex flex-row gap-4">
                <span class="font-bold">Total</span>
                <span>{{ total }}</span>
            </p>
        </div>
        <div class="px-5">
            <v-btn color="green" @click="emits('checkout')" :disabled="disabled">Confirmar</v-btn>
        </div>
    </div>
</template>