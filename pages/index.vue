<template>

  
  <div class="typewriter-container">
    <span class="typewriter-text">{{ displayText }}</span>
    <span class="typewriter-cursor" :style="{ opacity: cursorVisible ? 1 : 0 }">|</span>
  </div>




  </template>
  
  <script setup>

  import { ref, onMounted, watch } from 'vue'

const props = defineProps({
  texts: {
    type: Array,
    default: () => ["CHASSANG Thomas", "Développeur Fullstack", "Freelance"]
  },
  typingSpeed: {
    type: Number,
    default: 100
  },
  deletingSpeed: {
    type: Number,
    default: 50
  },
  pauseDuration: {
    type: Number,
    default: 1500
  },
  loop: {
    type: Boolean,
    default: true
  }
})

const displayText = ref('')
const cursorVisible = ref(true)
const currentIndex = ref(0)
const isDeleting = ref(false)
const isTyping = ref(true)

// Animation du curseur
onMounted(() => {
  setInterval(() => {
    cursorVisible.value = !cursorVisible.value
  }, 500)

  startTyping()
})

function startTyping() {
  const fullText = props.texts[currentIndex.value]
  
  if (isDeleting.value) {
    // Effacement
    displayText.value = fullText.substring(0, displayText.value.length - 1)
    
    if (displayText.value === '') {
      isDeleting.value = false
      currentIndex.value = (currentIndex.value + 1) % props.texts.length
      setTimeout(startTyping, props.typingSpeed)
    } else {
      setTimeout(startTyping, props.deletingSpeed)
    }
  } else {
    // Écriture
    displayText.value = fullText.substring(0, displayText.value.length + 1)
    
    if (displayText.value === fullText) {
      if (props.loop || currentIndex.value < props.texts.length - 1) {
        isDeleting.value = true
        setTimeout(startTyping, props.pauseDuration)
      }
    } else {
      setTimeout(startTyping, props.typingSpeed)
    }
  }
}

  const colorMode = useColorMode()
  console.log(colorMode.preference)
  </script>
  
  <style>

  .typewriter-container {
  display: inline-block;
  min-height: 1.2em; /* Garde l'espace même quand le texte est vide */
}

.typewriter-text {
  color: inherit;
  font-weight: inherit;
}

.typewriter-cursor {
  color: #3b82f6; /* Couleur bleue Tailwind */
  font-weight: normal;
  margin-left: 2px;
  transition: opacity 0.2s;
}
    body {
        background-color: #fff;
        color: rgba(0,0,0,0.8);
    }
    .dark-mode body {
        background-color: #091a28;
        color: #ebf4f1;
    }
    .sepia-mode body {
        background-color: #f1e7d0;
        color: #433422;
    }
  </style>
  