<template>
    <nuxt-link to="#"
        class="flex items-center py-3 px-6 text-black rounded-xl w-full max-w-[16rem] hover:bg-gray-200 dark:hover:bg-dim-300 dark:text-white"
        :class="defaultTransition, textClasses"
    >

        <div class="w-6 h-6 text-dark">
            <slot name="icon"></slot>
        </div>

        <div class="ml-4 text-sm sm:text-md" :class="textClasses">
            <slot name="name"></slot>
        </div>

    </nuxt-link>
</template>
<script setup>
const { defaultTransition } = useTailwindConfig()

const props = defineProps({
    active: {
        type: Boolean,
        default: false
    }
})

const textClasses = computed(() => props.active ? 'bg-gray-300 dark:bg-dim-300' : 'font-normal')


</script>