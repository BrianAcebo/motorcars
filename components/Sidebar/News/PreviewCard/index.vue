<template>
    <div class="mb-7 overflow-hidden border rounded-2xl bg-gray-50 dark:bg-dim-700" :class="mainBorderColor">

        <h1 class="p-3 text-xl font-extrabold text-gray-900 border-b dark:text-white" :class="mainBorderColor">
            {{ props.title }}
        </h1>

        <slot></slot>

        <div class="p-3 text-sm text-blue-400 cursor-pointer hover:bg-gray-100 dark:hover:bg-dim-300"
            :class="defaultTransition">
            Show more
        </div>


    </div>
</template>
<script setup>
const { mainBorderColor, defaultTransition } = useTailwindConfig()

const props = defineProps({
    title: {
        type: String,
        required: true
    }
})

</script>