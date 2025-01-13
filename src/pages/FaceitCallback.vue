<script setup lang="ts">
import { onMounted } from 'vue';
import Spinner from '@/components/ui/spinner/Spinner.vue';
import { Icon } from '@iconify/vue/dist/iconify.js';
import { AuthenticateFromFaceit } from '@/components/ibercs/user/user_state'

document.title = "IBERCS - Inicio de sesión"

onMounted(async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');

  if (code) {
    const isAuthenticated = await AuthenticateFromFaceit(code)
    if (isAuthenticated) {
      console.log("OK")
    } else {
      console.log("NO OK")
    }
    window.close();
  }
});
</script>

<template>
  <section class="h-[100vh] bg-slate-950 text-slate-200">
    <div class="flex flex-col justify-center items-center h-full gap-6">
      <div class="flex items-center gap-6 mb-6 rounded-full p-4 px-8 bg-slate-900 border border-slate-800">
        <Icon icon="simple-icons:faceit" class="h-[3rem] w-[3rem] scale-100 text-orange-600 mr-1" />
        <div class="h-1.5 w-20 bg-gradient-to-r from-orange-600 to-slate-300 rounded-2xl"></div>
        <img src="/logo.png" class="h-[4rem] w-[4rem]"/>
      </div>
      <div class="text-center font-bold text-xl">
        Iniciando sesión con <span class="">FACEIT</span>
      </div>
      <div>
        <Spinner />
      </div>
      <div class="text-center text-slate-400 font-semibold text-md mt-8">
        La ventana se cerrará automáticamente
      </div>
    </div>
  </section>
</template>