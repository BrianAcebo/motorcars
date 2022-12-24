<template>
    <div class="border" :class="mainBorderColor">
        <div class="flex items-center sticky top-0 px-4 py-3 bg-white/80 backdrop-blur-md dark:bg-dim-900/80">
            <a 
                :class="mainBorderColor"
                class="dark:text-white mr-3" 
                href="#" 
                @click="$router.go(-1)"
                v-if="props.title != 'Home'"
            >
                <div class="w-6 h-6">
                    <ArrowSmLeftIcon />
                </div>
            </a>

            <h2 class="text-xl font-bold text-gray-800 dark:text-gray-100">{{ props.title }}</h2>
        </div>

        <div v-if="props.loading" class="flex items-center justify-center p-4 border-b" :class="mainBorderColor">
            <UISpinner />
        </div>
        <div v-else>
            <slot></slot>
        </div>
    </div>
</template>

<script setup>
    import { ArrowSmLeftIcon } from "@heroicons/vue/solid"

    const { mainBorderColor } = useTailwindConfig()

    const props = defineProps({
        title: {
            type: String,
            required: true
        },
        loading: {
            type: Boolean,
            required: true
        }
    })
</script>