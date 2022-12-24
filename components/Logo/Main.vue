<template>
    <img v-if="!darkMode" class="mr-3 w-full h-full" src="~/assets/logos/logo.svg" />
    <img v-else class="mr-3 w-full h-full" src="~/assets/logos/logo-white.svg" />
</template>

<script setup>
    const darkMode = ref(true)

    const emitter = useEmitter()

    emitter.$on('toggleDarkMode', () => {
        darkMode.value = !darkMode.value
    })
</script>