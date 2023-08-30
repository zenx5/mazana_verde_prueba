<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto w-80" :src="logomv" alt="Manzana Verde" />
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6">
        <div>
          <label for="username" class="block text-sm font-medium leading-6 text-gray-900">Nombre de Usuario</label>
          <div class="mt-2">
            <input v-model="name" id="username" name="username" type="text" required
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Correo</label>
          <div class="mt-2">
            <input v-model="email" id="email" name="email" type="email" autocomplete="email" required
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Contraseña</label>
          </div>
          <div class="mt-2">
            <input v-model="password" id="password" name="password" type="password" autocomplete="new-password" required
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div>
          <label for="confirmPassword" class="block text-sm font-medium leading-6 text-gray-900">Confirmar Contraseña</label>
          <div class="mt-2">
            <input v-model="confirmPassword" id="confirmPassword" name="confirmPassword" type="password" autocomplete="new-password" required
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div>
          <button type="button" @click="submit"
            class="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">Registrarse</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
    import logomv from '@/assets/logo-mv.svg';
    import UserService from '@/services/UserService';
    import type { VueCookies } from 'vue-cookies'
    import router from '@/router'
    import { ref, inject } from 'vue';
    const $cookies = inject<VueCookies>('$cookies')
    const email = ref('')
    const name = ref('')
    const password = ref('')
    const confirmPassword = ref('')
    const loading = ref(false)
    

    const submit = async () => {
        try{
            loading.value = false
            console.log(name.value, email.value, password.value, confirmPassword.value)
            const data = await UserService.register(name.value, email.value, password.value, confirmPassword.value)
            if( !data.error ) {
                if( $cookies ) {
                    $cookies.set('token-hungriest', data.token, '1d')
                    router.push({ name: 'orderlist' })
                } else {
                    throw new Error('No se pudo iniciar sesión')
                }
            }
        } catch(error) {
            console.log(error)
        }finally {
            loading.value = false
        }
    }
</script>
