<script setup lang="ts">
    const { username } = defineProps<{
        username: string
    }>()
    const emits = defineEmits<{
        (e: 'close' ): void
    }>()

    const action = () => {
        emits('close')
    }

</script>

<template>
    <v-card>
        <v-card-title class="text-center">
            <h2 class="text-2xl text-center p-4 sticky top-0 bg-green-500 text-white border-b-2 shadow-md font-bold">Pedido Confirmado</h2>
        </v-card-title>
        <v-card-text class="text-center">
            <p class="text-xl">Gracias por tu compra {{ username }}</p>
            <p class="text-xl">Tu pedido llegara en 30 minutos</p>
        </v-card-text>
        <v-card-actions class="justify-center">
            <v-btn color="green" @click="action">Aceptar</v-btn>
        </v-card-actions>
    </v-card>
</template>