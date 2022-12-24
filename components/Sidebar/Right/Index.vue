<template>
    <div clas="flex flex-col">
        <div 
            class="flex flex-row items-center justify-center px-2 py-2 mx-auto mt-auto mb-5 rounded-full cursor-pointer w-14 xl:w-full hover:bg-gray-100 dark:hover:bg-dim-800"
            :class="defaultTransition" 
            @click="emits('onLogout')"
        >
            <div class="flex flex-row">
                <img :src="props.user.profileImage" class="w-10 h-10 rounded-full">
                <div class="flex-col hidden ml-2 xl:block">
                    <h1 class="text-sm font-bold text-gray-800 dark:text-white">
                        <!-- {{ user.name }} -->
                        Brian Acebo
                    </h1>
                    <p class="text-sm text-gray-400">
                        {{ user.email }}
                    </p>
                </div>

            </div>

            <!-- ICON -->
            <div class="hidden ml-auto xl:block">
                <div class="w-6 h-6 text-dark dark:text-white">
                    <ChevronDownIcon />
                </div>
            </div>
        </div>

        <!-- Preview Card : Who to follow -->
        <SidebarRightPreviewCard title="Friends">

            <!-- Search bar -->
            <div class="relative mt-4 px-2">
                <div class="absolute flex items-center h-full pl-4 text-gray-600 cursor-pointer">
                    <div class="w-6 h-6">
                        <SearchIcon @click="handleSearch" />
                    </div>
                </div>
                <input 
                    v-model="search"
                    class="flex items-center w-full pl-12 text-sm font-normal text-black bg-gray-200 border border-gray-200 rounded-full shadow dark:text-gray-100 dark:bg-dim-400 dark:border-dim-400 focus:bg-gray-100 dark:focus:bg-dim-900 focus:outline-none focus:border focus:border-blue-200 h-9"
                    placeholder="Search friends" type="text"
                >
            </div>

            <SidebarRightPreviewCardItem v-for="whoToFollow in whoToFollowItems">
                <div class="flex flex-row items-center justify-between p-2">
                    <div class="flex flex-row">
                        <img class="w-10 h-10 rounded-full" :src="whoToFollow.image" :alt="whoToFollow.name">

                        <div class="flex flex-col ml-2">
                            <h1 class="text-sm font-bold text-gray-900 dark:text-white">{{ whoToFollow.name }}</h1>
                            <p class="text-xs text-gray-400">{{ whoToFollow.handle }}</p>
                        </div>
                    </div>
                    <div class="flex h-full">
                        <button
                            class="px-4 py-2 text-xs font-bold text-white bg-black rounded-full dark:text-black dark:bg-white">Follow</button>
                    </div>
                </div>
            </SidebarRightPreviewCardItem>
        </SidebarRightPreviewCard>

        <footer>
            <ul class="mx-2 my-4 text-xs text-gray-500">
                <li class="inline-block mx-2">
                    <a href="#" class="hover:underline" @click.prevent="handleToggleDarkMode">Dark mode</a>
                </li>
                <li class="inline-block mx-2">
                    <a href="#" class="hover:underline">Privacy Policy</a>
                </li>
                <li class="inline-block mx-2">
                    <a href="#" class="hover:underline">Cookie Policy</a>
                </li>
                <li class="inline-block mx-2">
                    <a href="#" class="hover:underline">Accessability</a>
                </li>
                <li class="inline-block mx-2">
                    <a href="#" class="hover:underline">Ads info</a>
                </li>
                <li class="inline-block mx-2">
                    <a href="#" class="hover:underline">More</a>
                </li>
                <li class="inline-block mx-2">
                    © 2022 main, Inc.
                </li>
            </ul>
        </footer>
    </div>
</template>

<script setup>
    import { SearchIcon, ChevronDownIcon } from '@heroicons/vue/outline';
    const search = ref('')
    const emitter = useEmitter()
    const { defaultTransition } = useTailwindConfig()

    const emits = defineEmits(['onLogout'])

    const props = defineProps({
        user: {
            type: Object,
            required: true
        }
    })

    function handleSearch() {
        useRouter().push({
            path: '/search',
            query: {
                q: search.value
            }
        })
    }

    const whoToFollowItems = ref([
        {
            name: 'John Doe',
            handle: '@johndoe',
            image: 'https://picsum.photos/200/200'
        },
        {
            name: 'John Doe',
            handle: '@johndoe',
            image: 'https://picsum.photos/200/200'
        },
        {
            name: 'John Doe',
            handle: '@johndoe',
            image: 'https://picsum.photos/200/200'
        },
        {
            name: 'John Doe',
            handle: '@johndoe',
            image: 'https://picsum.photos/200/200'
        },
        {
            name: 'John Doe',
            handle: '@johndoe',
            image: 'https://picsum.photos/200/200'
        },
        {
            name: 'John Doe',
            handle: '@johndoe',
            image: 'https://picsum.photos/200/200'
        },
        {
            name: 'John Doe',
            handle: '@johndoe',
            image: 'https://picsum.photos/200/200'
        },
        {
            name: 'John Doe',
            handle: '@johndoe',
            image: 'https://picsum.photos/200/200'
        },
    ])

    function handleToggleDarkMode() {
        emitter.$emit('toggleDarkMode')
    }
</script>