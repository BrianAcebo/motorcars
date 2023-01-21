<template>
    <div>
        <label for="" v-if="props.label" class="font-heading block ml-px mb-3 text-sm font-medium dark:text-white text-gray-700">
            {{ props.label}}
        </label>
        <div class="mt-1">
            <input 
                :value="props.modelValue" @input="event => emits('update:modelValue', event.target.value)"
                class="font-body block w-full px-6 py-3 border-gray-300 dark:border-white dark:bg-transparent dark:text-white focus:ring-0 focus:border-blue-500 text-sm"
                :type="props.type" 
                :placeholder="props.placeholder"
            >
        </div>
    </div>
</template>
<script setup>
const emits = defineEmits(['update:modelValue'])

const props = defineProps({
    modelValue: {
        type: String,
        required: true
    },
    placeholder: {
        type: String,
        default: ''
    },
    type: {
        type: String,
        default: 'text'
    },
    label: {
        type: String,
        default: null
    }
})

</script>