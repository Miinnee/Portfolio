<template>
  <div :class="{'dark': $colorMode.value === 'dark'}">
    <div class="container mx-auto px-4 py-6">
      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-bold dark:text-white">CHASSANG Thomas - {{ calculateAge("2006-01-20") }} ans</h1>
        <nav>
          <ul>
            
          </ul>
        </nav>


        <!-- Toggle switch animé -->
        <div class="flex items-center space-x-4">
          <span class="text-sm font-medium text-gray-500 dark:text-gray-400">Color mode: {{ $colorMode.value }}</span>
          
          <button
            @click="toggleColorMode"
            class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
            :class="{
              'bg-gray-200': $colorMode.value !== 'dark',
              'bg-blue-600': $colorMode.value === 'dark'
            }"
          >
            <span class="sr-only">Toggle dark mode</span>
            <span
              class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
              :class="{
                'translate-x-1': $colorMode.value !== 'dark',
                'translate-x-6': $colorMode.value === 'dark'
              }"
            >
              <component 
                :is="$colorMode.value === 'dark' ? Moon : Sun" 
                class="w-3 h-3 mx-auto" 
                :class="{
                  'text-yellow-300': $colorMode.value !== 'dark',
                  'text-gray-200': $colorMode.value === 'dark'
                }"
              />
            </span>
          </button>
        </div>
      </div>
    </div>
    
    <NuxtRouteAnnouncer />
    <NuxtLoadingIndicator />

    <NuxtLayout>
          <NuxtPage />
    </NuxtLayout>
  </div>
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
  
  // Si l'anniversaire n'est pas encore passé cette année
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  
  return age
}
</script>

<style>
/* Transition douce pour le changement de thème */
html {
  @apply transition-colors duration-300;
}

/* Animation du toggle */
button span {
  transition: transform 0.3s ease-in-out, background-color 0.3s ease;
}
</style>