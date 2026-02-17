<template>
  <div class="max-w-[500px] mx-auto min-h-screen bg-base-100">
    <HeaderGlobal title="register" />

    <div class="flex justify-center mt-24">
      <img src="/asset/Giro.png" alt="sary" class="w-30 h-30" />
    </div>

    <div class="flex items-center justify-center mt-3">
      <div
        class="w-full mx-3 text-center bg-primary rounded-3xl shadow-2xl p-6"
      >
        <form class="space-y-5">
          <div>
            <div
              class="flex items-center border border-gray-300 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-primary text-white"
            >
              <span class="px-4 flex items-center gap-2">
                <img
                  src="https://downpg117.uqianbao.com/source/public/static/png/DuiwawP0.png"
                  class="h-5"
                  alt="logo"
                />
                <span class="text-sm">+55</span>
              </span>
              <input
                type="text"
                v-model="phone"
                maxlength="11"
                inputmode="numeric"
                placeholder="Seu número"
                class="w-full py-2 px-4 text-gray-400 placeholder-gray-400 focus:outline-none"
              />
            </div>
          </div>

          <!-- Mot de passe avec toggle -->
          <div>
            <div class="relative">
              <input
                :type="showPassword ? 'text' : 'password'"
                v-model="password"
                placeholder="Digite sua senha"
                class="w-full py-2 px-4 text-gray-400 placeholder-gray-400 border border-gray-300 rounded-xl pr-12 focus:ring-2 focus:ring-primary focus:outline-none"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {{ showPassword ? "👁️" : "👁️‍🗨️" }}
              </button>
            </div>
          </div>

          <!-- Checkbox en bas du mot de passe -->
          <div class="flex items-center space-x-2 text-white text-sm font-bold mt-8">
            <input
              type="checkbox"
              id="terms"
              class="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
            />
            <label for="terms" class="select-none ml-4"> Lembrar a senha </label>
          </div>

          <!-- Submit -->
          <button
            type="button"
            @click="showSuccess = true"
            :class="[
              'w-full py-[0.8rem] rounded-xl font-bold text-gray-900 transition-colors mb-2',
              showSuccess ? 'bg-accent' : 'bg-accent',
            ]"
          >
            {{ showSuccess ? "✓ Entrado!" : "Entrar" }}
          </button>
        </form>
      </div>
    </div>

    <div>
      <p class="text-white ml-4 mt-4 font-bold">
        Não tem conta?
        <span class="text-yellow-300 underline"><NuxtLink to="/login" >Cadastre-se</NuxtLink></span>
      </p>
    </div>

    <div class="px-6 text-sm">
      <p class="text-gray-400 font-bold text-center mt-6">
        Bem-vindo ao <span class="text-yellow-300">https://giro77.bet</span>
      </p>

      <p class="text-gray-400 font-bold text-center">
        Proporcionar a você uma experiência de jogo sem precedentes
      </p>
    </div>

    <div
      class="w-full flex flex-row justify-between items-center gap-2 px-6 mt-14"
    >
      <img
        src="https://downpg117.uqianbao.com/source/public/static/webp/CbkHlecm.webp"
        alt=""
        loading="eager"
        fetchpriority="high"
        decoding="async"
        class="h-7.5 aspect-[4.45/1]"
      />
      <img
        src="https://downpg117.uqianbao.com/source/public/static/webp/DcWbmleq.webp"
        alt=""
        loading="eager"
        fetchpriority="high"
        decoding="async"
        class="h-7.5 aspect-[3.5/1]"
      />
      <img
        src="https://downpg117.uqianbao.com/source/public/static/webp/C-S8qa3_.webp"
        alt=""
        loading="eager"
        fetchpriority="high"
        decoding="async"
        class="h-7.5 aspect-[3.04/1]"
      />
    </div>
  </div>
</template>

<script>
import HeaderGlobal from "~/components/HeaderGlobal.vue";

export default {
  components: { HeaderGlobal },

  data() {
    return {
      phone: "",
      password: "",
      showPassword: false,
      acceptTerms: true,
      showSuccess: false,
    };
  },

  watch: {
    // Reset le message de succès après 3 secondes
    showSuccess(value) {
      if (value) {
        setTimeout(() => {
          this.showSuccess = false;
        }, 3000);
      }
    },
  },
};
</script>
