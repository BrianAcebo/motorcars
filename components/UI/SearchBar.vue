<template>
    <!-- Search bar -->
    <div class="mb-16 sticky top-0">
        <div class="absolute flex items-center h-full pl-4 text-gray-600 cursor-pointer">
            <div class="w-4 h-4">
                <SearchIcon @click="handleSearch" />
            </div>
        </div>

        <input 
            v-model="search"
            class="flex items-center w-full pl-12 text-sm font-normal text-black bg-white border border-white-200 rounded-full dark:text-gray-100 dark:bg-dim-400 dark:border-dim-400 h-9"
            placeholder="Search..." type="text"
            v-on:keyup.enter="handleSearch"
        >
    </div>
</template>

<script setup>
    import { SearchIcon } from '@heroicons/vue/outline';

    const search = ref('')

    function handleSearch() {
        useRouter().push({
            path: '/search',
            query: {
                q: search.value
            }
        })
    }
</script>