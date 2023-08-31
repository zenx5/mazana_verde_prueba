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
          <label for="username" class="block text-sm font-medium leading-6 text-gray-900">Nombre de Usuario</label>
          <div class="mt-2">
            <input v-model="name" id="username" name="username" type="text" required
              class="focus:bg-white px-5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Correo</label>
          <div class="mt-2">
            <input v-model="email" id="email" name="email" type="email" autocomplete="email" required
              class="focus:bg-white px-5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Contraseña</label>
          </div>
          <div class="mt-2">
            <input v-model="password" id="password" name="password" type="password" autocomplete="new-password" required
              class="focus:bg-white px-5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div>
          <label for="confirmPassword" class="block text-sm font-medium leading-6 text-gray-900">Confirmar Contraseña</label>
          <div class="mt-2">
            <input v-model="confirmPassword" id="confirmPassword" name="confirmPassword" type="password" autocomplete="new-password" required
              class="focus:bg-white px-5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div>
          <button type="button" @click="submit"
            class="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">Registrarse</button>
        </div>
      </form>
      <p class="mt-2 text-sm text-center italic text-red-500">{{ error }}</p>
      <p class="mt-10 text-center text-sm text-gray-500">
          ¿Ya estas registrado?
          {{ ' ' }}
          <router-link to="/login" class="font-semibold leading-6 text-green-600 hover:text-green-500">Accede aquí</router-link>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
    import logomv from '@/assets/logo-mv.svg';
    import UserService from '@/services/UserService';
    import type { VueCookies } from 'vue-cookies'
    import router from '@/router'
    import { ref, inject } from 'vue';
    import store from '@/store';
    const $cookies = inject<VueCookies>('$cookies')
    const error = ref('')
    const email = ref('')
    const name = ref('')
    const password = ref('')
    const confirmPassword = ref('')
    const loading = ref(false)
    

    const submit = async () => {
        let errorAux = ''
        try{
            loading.value = false
            const data = await UserService.register(name.value, email.value, password.value, confirmPassword.value)
            if( !data.error ) {
                if( $cookies ) {
                    $cookies.set('token-hungriest', data.token, '1d')
                    $cookies.set('user-hungriest', data.user, '1d')
                    store.commit('setUser', data.user)
                    store.commit('setToken', data.token)
                    router.push({ name: 'orderlist' })
                } else {
                    throw new Error("No se pudo guardar la session")
                }
            } else {
              throw new Error(data.message)
            }
        } catch(error) {
            errorAux = error.message
        }finally {
            loading.value = false
            error.value = errorAux
        }
    }
</script>
