<template>
    <div>

        <div v-if="isEmptyArray" class="p-4">
            <p class="text-center text-gray-500">
                No posts
            </p>
        </div>
        <div 
            v-else class="cursor-pointer hover:bg-gray-100 dark:hover:bg-dim-300"
            :class="[mainBorderColor, defaultTransition]" 
            v-for="post in props.posts" 
            :key="post.id"
            @click.native="redirect(post)"
        >
            <PostItem :post="post" compact />
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