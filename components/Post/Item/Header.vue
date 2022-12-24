<template>
    <div class="flex items-center">

        <nuxt-link :to="'/profile/' + author.handle">
            <img class="w-9 h-9 rounded-full" :src="author.profileImage" alt="">
        </nuxt-link>

        <div class="ml-3 flex items-center text-sm">
            <span class="font-medium text-gray-800 dark:text-white">
                <nuxt-link :to="'/profile/' + author.handle">
                    <!-- {{ author.name }} -->
                    Brian Acebo
                </nuxt-link>
            </span>


            <span class="ml-2 text-xs font-medium text-gray-400">
                <nuxt-link :to="'/profile/' + author.handle">
                    <!-- {{ author.handle }} -->
                    @brianacebo
                </nuxt-link>
                - {{ props.post.postedAtHuman }}
            </span>
        </div>

    </div>
</template>

<script setup>
    const props = defineProps({
        post: {
            type: Object,
            required: true
        }
    })

    const author = props.post.author
</script>