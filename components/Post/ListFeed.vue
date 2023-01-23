<template>
    <div class="pb-16">
        <div v-if="isEmptyArray" class="p-4">
            <p class="text-center text-gray-500">
                No posts
            </p>
        </div>
        <div v-else>
            <div 
                class="cursor-pointer hover:bg-gray-100 dark:hover:bg-dim-300"
                :class="[mainBorderColor, defaultTransition]" 
                v-for="post in props.posts" 
                :key="post.id"
                @click.native="redirect(post)"
            >
                <PostItem :post="post" compact />
            </div>
            <p class="text-center text-gray-500 mt-16">
                No more posts...
            </p>
        </div>
    </div>
</template>

<script setup>
    const { mainBorderColor, defaultTransition } = useTailwindConfig()

    const props = defineProps({
        posts: {
            type: Array,
            required: true
        }
    })

    const isEmptyArray = computed(() => props.posts.length === 0)

    function redirect(post) {
        navigateTo(`/post/${post.id}`)
    }
</script>