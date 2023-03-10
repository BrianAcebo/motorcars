<template>
    <TransitionRoot appear :show="props.isOpen" as="template">
        <Dialog as="div" @close="closeModal" class="relative z-30">
            <TransitionChild 
                as="template" 
                enter="duration-300 ease-out" 
                enter-from="opacity-0" 
                enter-to="opacity-100"
                leave="duration-200 ease-in" 
                leave-from="opacity-100" 
                leave-to="opacity-0"
            >
                <div class="fixed inset-0 bg-black bg-opacity-25" />
            </TransitionChild>

            <div class="fixed inset-0 overflow-y-auto" @click="closeModal">
                <div class="flex items-center justify-center min-h-full p-2 sm:p-4 text-center" @click.stop="">
                    <TransitionChild 
                        as="template" 
                        enter="duration-300 ease-out" 
                        enter-from="opacity-0 scale-95"
                        enter-to="opacity-100 scale-100" 
                        leave="duration-200 ease-in" 
                        leave-from="opacity-100 scale-100"
                        leave-to="opacity-0 scale-95"
                    >
                        <DialogPanel
                            :class="{ 
                                'bg-dim-700 dark': darkMode,
                                'bg-white': !darkMode
                            }"
                            class="w-full max-w-md p-3 sm:p-6 overflow-hidden text-left align-middle transition-all transform shadow-xl rounded-2xl"
                        >
                            <slot></slot>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script setup>
    import {
        TransitionRoot,
        TransitionChild,
        Dialog,
        DialogPanel,
    } from '@headlessui/vue'

    const emits = defineEmits(['onClose'])

    const darkMode = ref(true)

    const emitter = useEmitter()

    emitter.$on('toggleDarkMode', () => {
        darkMode.value = !darkMode.value
    })

    const props = defineProps({
        isOpen: {
            type: Boolean,
            required: true
        }
    })

    function closeModal() {
        emits('onClose')
    }
</script>
