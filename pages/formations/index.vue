<template>
    <h1>Color mode: {{ $colorMode.value }}</h1>
</template>

<script setup>
    const colorMode = useColorMode()
    console.log(colorMode.preference)
</script>