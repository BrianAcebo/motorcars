<template>
    <div class="flex items-center justify-between xs:justify-around w-4/5 xs:max-w-[150px]">

        <PostItemActionsIcon color="blue" @on-click="emits('onCommentClick')" :size="size">
            <template v-slot:icon="{ classes }">
                <ChatIcon :class="classes" />
            </template>

            <template v-if="showStats" v-slot:default>
                {{ props.post.repliesCount }}
            </template>
        </PostItemActionsIcon>

        
        <PostItemActionsIcon color="green" :size="size">
            <template v-slot:icon="{ classes }">
                <RefreshIcon :class="classes" />
            </template>

            <template v-if="showStats" v-slot:default>
                {{ generateRandomNumber() }}
            </template>
        </PostItemActionsIcon>


        <PostItemActionsIcon color="red" :size="size">
            <template v-slot:icon="{ classes }">
                <HeartIcon :class="classes" />
            </template>

            <template v-if="showStats" v-slot:default>
                {{ generateRandomNumber() }}
            </template>
        </PostItemActionsIcon>


        <PostItemActionsIcon color="blue" :size="size">
            <template v-slot:icon="{ classes }">
                <UploadIcon :class="classes" />
            </template>

            <template v-if="showStats" v-slot:default>
                {{ generateRandomNumber() }}
            </template>
        </PostItemActionsIcon>

    </div>
</template>

<script setup>
    import { ChatIcon, RefreshIcon, HeartIcon, UploadIcon } from '@heroicons/vue/outline';

    const emits = defineEmits(['onCommentClick'])


    const props = defineProps({
        post: {
            type: Object,
            required: true
        },
        compact: {
            type: Boolean,
            default: false
        }
    })

    const showStats = false
    //computed(() => props.compact)
    const size = computed(() => props.compact ? 4 : 4)

    function generateRandomNumber() {
        return Math.floor(Math.random() * 100)
    }
</script>