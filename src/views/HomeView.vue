<script setup lang="ts">
    import { ref, inject } from 'vue'
    import { useRouter } from 'vue-router';
    import type { VueCookies } from 'vue-cookies'

    import logomv from '@/assets/logo-mv.svg'
    import UserService from '@/services/UserService';
    import store from '@/store'
    import { getCurrentCountry } from '@/tools/geolocalization';

    const countryName = ref('')
    const countryCode = ref('')
    const loading = ref(true)
    const router = useRouter();

    const $cookies = inject<VueCookies>('$cookies')

    getCurrentCountry( (country:any) => {
        countryName.value = country.country
        countryCode.value = country.country_code
        loading.value = false
    });


    const logout = async () => {
        if( $cookies ) {
            const token = $cookies?.get('token-hungriest')
            if( token ) {
                await UserService.logout( token );
                $cookies.remove('token-hungriest')
            }
            router.push({name:'login'});
        }
    }
</script>

<template>
    <main class="w-full h-full">
        <div class="flex flex-col items-center justify-center h-1/4">
            <img class="mx-auto w-40" :src="logomv" alt="Manzana Verde" />
            <small>Presenta</small>
            <h3 class="text-lg font-semibold mt-3">Hungriest</h3>
        </div>
        <div class="flex flex-col items-center justify-start h-3/4 pt-40">
            <h1 class="text-3xl text-center font-bold">Bienvenido, saludos a </h1>
            <div v-if="!loading" class="flex flex-row gap-2 border p-3 px-6 rounded-md mt-4 bg-white">
                <img
                    :src="`https://flagcdn.com/48x36/${countryCode}.png`"
                    width="32"
                    :alt="countryName"
                >
                {{ countryName }}
            </div>
            <div v-else class="flex flex-row gap-2 border p-3 px-6 rounded items-center mt-4">
                <v-skeleton-loader type="image" width="48" height="36" class="overflow-hidden"/>
                <v-skeleton-loader type="text" width="100" height="36" />
            </div>
            <div class="flex flex-col items-center gap-5" v-if="store.state.logged">
                <router-link to="/food" class="mt-5">
                    <v-btn class="mt-20" color="green">
                        <template v-slot:append>
                            <v-icon>mdi-arrow-right</v-icon>
                        </template>
                        Ir al menu
                    </v-btn>
                </router-link>
                <v-btn color="red" @click="logout">
                    <template v-slot:append>
                        <v-icon>mdi-logout</v-icon>
                    </template>
                    Salir
                </v-btn>
            </div>
            <div class="flex flex-col items-center" v-else>
                <router-link to="/login" class="mt-5">
                    <v-btn class="mt-20" color="green">
                        <template v-slot:append>
                            <v-icon>mdi-account</v-icon>
                        </template>
                        Ingresa aquí
                    </v-btn>
                </router-link>
                <router-link to="/register" class="mt-5">o registrate aquí</router-link>
            </div>
        </div>
    </main>
</template>

