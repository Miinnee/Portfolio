<template>
<div :class="{ 'dark': $colorMode.value === 'dark' }">
  <nav class="bg-white border-gray-200 dark:bg-gray-900">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <div class="flex items-center justify-between w-full md:w-auto">
        <h1 class="text-xl md:text-2xl font-bold dark:text-white">CHASSANG Thomas - {{ calculateAge("2006-01-20") }} ans</h1>
        
        <!-- Bouton menu mobile -->
        <button @click="isMenuOpen = !isMenuOpen" class="md:hidden text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>

      <div 
        class="w-full md:w-auto md:block" 
        :class="{ 'hidden': !isMenuOpen, 'block': isMenuOpen }" 
        id="navbar-default"
      >
        <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
          <li>
            <NuxtLink to="/" class="block py-2 px-3 rounded-sm md:border-0 md:p-0" :class="{
              'text-white md:bg-transparent md:text-blue-700 dark:text-white md:dark:text-blue-500': $route.path === '/',
              'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent': $route.path !== '/'
            }" aria-current="page">Home</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/formations" class="block py-2 px-3 rounded-sm md:border-0 md:p-0" :class="{
              'text-white md:bg-transparent md:text-blue-700 dark:text-white md:dark:text-blue-500': $route.path === '/formations',
              'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent': $route.path !== '/formations'
            }">Formations</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/services" class="block py-2 px-3 rounded-sm md:border-0 md:p-0" :class="{
              'text-white md:bg-transparent md:text-blue-700 dark:text-white md:dark:text-blue-500': $route.path === '/services',
              'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent': $route.path !== '/services'
            }">Services</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/pricing" class="block py-2 px-3 rounded-sm md:border-0 md:p-0" :class="{
              'text-white md:bg-transparent md:text-blue-700 dark:text-white md:dark:text-blue-500': $route.path === '/pricing',
              'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent': $route.path !== '/pricing'
            }">Pricing</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/contact" class="block py-2 px-3 rounded-sm md:border-0 md:p-0" :class="{
              'text-white md:bg-transparent md:text-blue-700 dark:text-white md:dark:text-blue-500': $route.path === '/contact',
              'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent': $route.path !== '/contact'
            }">Contact</NuxtLink>
          </li>
          <li class="mt-4 md:mt-0">
            <div class="flex items-center space-x-4">
              <span class="text-sm font-medium text-gray-500 dark:text-gray-400 hidden md:inline">Color mode: {{ $colorMode.value }}</span>

              <button @click="toggleColorMode"
                class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
                :class="{
                  'bg-gray-200': $colorMode.value !== 'dark',
                  'bg-blue-600': $colorMode.value === 'dark'
                }">
                <span class="sr-only">Toggle dark mode</span>
                <span class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform" :class="{
                  'translate-x-1': $colorMode.value !== 'dark',
                  'translate-x-6': $colorMode.value === 'dark'
                }">
                  <component :is="$colorMode.value === 'dark' ? Moon : Sun" class="w-3 h-3 mx-auto" :class="{
                    'text-yellow-300': $colorMode.value !== 'dark',
                    'text-gray-200': $colorMode.value === 'dark'
                  }" />
                </span>
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</div>
  <NuxtRouteAnnouncer />
  <NuxtLoadingIndicator />

  <NuxtLayout>
      <NuxtPage />
  </NuxtLayout>

</template>

<script setup lang="ts">
import Moon from '~/assets/moon.svg'
import Sun from '~/assets/sun.svg'
const colorMode = useColorMode()

const toggleColorMode = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

const calculateAge = (birthdate: string | Date): number => {
  const birthDate = new Date(birthdate)
  const today = new Date()

  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }

  return age
}

const isMenuOpen = ref(false);

// Fonction pour fermer le menu quand on clique sur un lien (utile pour mobile)
const closeMenu = () => {
  isMenuOpen.value = false;
};
</script>

<style>
@import "flowbite/src/themes/default";
@plugin "flowbite/plugin";
@source "../../node_modules/flowbite";

/* Transition douce pour le changement de thème */
html {
  @apply transition-colors duration-300;
}

/* Animation du toggle */
button span {
  transition: transform 0.3s ease-in-out, background-color 0.3s ease;
}

/* Style actif pour les liens NuxtLink */
.router-link-active {
  @apply text-blue-700 dark:text-blue-500;
}

.router-link-exact-active {
  @apply font-bold;
}
</style>