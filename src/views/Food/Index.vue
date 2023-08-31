<template>
    <div class="w-10/12 mx-auto pt-8 " >
        <v-btn icon="mdi-logout" class="!absolute top-5 right-5 !bg-red-200 hover:!bg-red-500 text-white" @click="logout"></v-btn>
        <header class="mb-10">
            <h1 class="text-3xl text-center py-5 border-b-4"><span class="font-bold">Hungriest</span> tu lugar favorito</h1>
        </header>

        <RouterView />
    </div>
</template>
<script setup lang="ts">
    import { inject } from 'vue';
    import type { VueCookies } from 'vue-cookies'
    import { useRouter } from 'vue-router';
    import UserService from '@/services/UserService';
    const router = useRouter();
    const $cookies = inject<VueCookies>('$cookies')

    const logout = async () => {
        if( $cookies ) {
            const token = $cookies?.get('token-hungriest')
            const data = await UserService.logout( token );
            $cookies.remove('token-hungriest')
            router.push({name:'login'});
        }
    }
</script>