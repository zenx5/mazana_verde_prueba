<template>
    <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <router-link to="/">
            <v-btn color="green" class="!absolute top-10 left-10 !rounded-full" >
                <template v-slot:prepend>
                    <v-icon>mdi-chevron-left</v-icon>
                </template>Home</v-btn>
        </router-link>
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <img class="mx-auto w-80" :src="logomv" alt="Manzana Verde" />
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form class="space-y-6">
                <div>
                    <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Correo</label>
                    <div class="mt-2">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autocomplete="email"
                            required
                            v-model="email"
                            class="focus:bg-white px-5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>

                <div>
                    <div class="flex items-center justify-between">
                        <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Contraseña</label>
                    </div>
                    <div class="mt-2">
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autocomplete="current-password"
                            required
                            v-model="password"
                            class="focus:bg-white px-5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>

                <div>
                    <button
                        @click="submit"
                        type="button"
                        class="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">Acceder</button>
                </div>
            </form>
            <p class="mt-2 text-sm text-center italic text-red-500">{{ error }}</p>
            <p class="mt-10 text-center text-sm text-gray-500">
                ¿No estas registrado?
                {{ ' ' }}
                <router-link to="/register" class="font-semibold leading-6 text-green-600 hover:text-green-500">Registrate ya!</router-link>
            </p>
    </div>
</div>
</template>
<script setup lang="ts">
    import type { VueCookies } from 'vue-cookies'
    import store from '@/store';
    import { ref } from 'vue'
    import logomv from '@/assets/logo-mv.svg'
    import { inject } from 'vue';
    import { useRouter } from 'vue-router';
    import UserService from '@/services/UserService';
    const loading = ref(false)
    const error = ref<string>('')
    const email = ref('')
    const password = ref('')
    const $cookies = inject<VueCookies>('$cookies')
    const router = useRouter()

    const submit = async () => {
        let errorAux = ''
        try{
            loading.value = false
            const data = await UserService.login(email.value, password.value)
            if( !data.error ) {
                if( $cookies ) {
                    $cookies.set('token-hungriest', data.token, '1d')
                    $cookies.set('user-hungriest', data.user, '1d')
                    store.commit('setUser', data.user)
                    store.commit('setToken', data.token)
                    router.push({ name: 'orderlist' })
                } else {
                    throw new Error('No se pudo iniciar sesión')
                }
            } else {
                throw new Error(data.message)
            }
        } catch(error:any) {
            errorAux = error.message
        }finally {
            loading.value = false
            error.value = errorAux
        }
    }
</script>
