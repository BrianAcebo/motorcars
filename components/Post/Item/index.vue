<template>
    <div class="p-4 border-b border-t" :class="mainBorderColor">
        <PostItemHeader :post="props.post" />

        <div class="py-2 pl-12">
            <p class="flex-shrink w-auto font-normal text-gray-800 dark:text-white" :class="textSize">
                {{ props.post.text }}
            </p>

            <div 
                v-for="image in post.mediaFiles" 
                :key="image.id" 
                class="flex my-3 mr-2 border-2 rounded-2xl"
                :class="mainBorderColor"
            >
                <img :src="image.url" class="w-full rounded-2xl" />
            </div>

            <div class="mt-2 flex justify-end items-center" :class="{ 'justify-between': props.post.replyTo }" v-if="!props.hideActions">
                <p v-if="props.post.replyTo" class="text-xs">
                    <span class="text-gray-500">
                        Reply to
                    </span>

                    <nuxt-link :to="replyToPostUrl" class="text-blue-400">
                        <!-- {{ props.post.replyTo.author.handle }} -->
                        @brianacebo
                    </nuxt-link>
                </p>

                <PostItemActions 
                    :post="props.post" 
                    :compact="props.compact"
                    @on-comment-click="handleCommentClick" 
                />
            </div>
        </div>
    </div>
</template>

<script setup>
    const { mainBorderColor } = useTailwindConfig()

    const emitter = useEmitter()

    const props = defineProps({
        post: {
            type: Object,
            required: true
        },
        compact: {
            type: Boolean,
            default: false
        },
        hideActions: {
            type: Boolean,
            default: false
        }
    })

    const postBodyWrapper = computed(() => props.compact ? 'py-2 pl-12' : 'py-2 pl-12')

    const replyToPostUrl = computed(() => `/post/${props.post?.replyTo?.id}`)

    const textSize = computed(() => props.compact ? 'text-sm' : 'text-base')

    function handleCommentClick() {
        emitter.$emit('replyPost', props.post)
    }

</script>