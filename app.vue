<template>
    <div :class="{ 'dark': darkMode }">
        <div class="bg-white dark:bg-dim-900">

            <LoadingPage v-if="isAuthLoading" />

            <!-- App -->
            <div v-else-if="user" clas="min-h-full">

                <div class="flex justify-around mx-auto lg:max-w-[1440px] lg:px-6">

                    <!-- Left sidebar -->
                    <div class="hidden md:block w-1/6">
                        <div class="sticky top-0">
                            <SidebarLeft :user="user" @on-post="handleOpenPostModal" />
                        </div>
                    </div>

                    <!-- Main content -->
                    <main class="w-4/6 px-7 pt-8">
                        <!-- Search bar -->
                        <div class="relative mb-16">
                            <div class="absolute flex items-center h-full pl-4 text-gray-600 cursor-pointer">
                                <div class="w-4 h-4">
                                    <SearchIcon @click="handleSearch" />
                                </div>
                            </div>
                            <input 
                                v-model="search"
                                class="flex items-center w-full pl-12 text-sm font-normal text-black bg-gray-200 border border-gray-200 rounded-full shadow dark:text-gray-100 dark:bg-dim-400 dark:border-dim-400 focus:bg-gray-100 dark:focus:bg-dim-900 focus:outline-none focus:border focus:border-blue-200 h-9"
                                placeholder="Search..." type="text"
                            >
                        </div>

                        <div class="flex justify-around">
                            <div class="w-4/6 mr-7">
                                <router-view />
                            </div>

                            <div class="w-2/6">
                                <SidebarNews />
                            </div>
                        </div>
                    </main>

                    <!-- Right Sidebar -->
                    <div class="hidden col-span-12 md:block w-1/4 mt-7">
                        <div class="sticky top-0">
                            <SidebarRight :user="user" @on-logout="handleUserLogout" />
                        </div>
                    </div>


                </div>


            </div>

            <AuthPage v-else />

            <UIModal :isOpen="postModal" @on-close="handleModalClose">
                <PostForm :replyTo="replyPost" showReply :user="user" @onSuccess="handleFormSuccess" />
            </UIModal>

        </div>

    </div>
</template>

<script setup>
    import '@/assets/css/main.css'
    import { SearchIcon } from '@heroicons/vue/outline';

    const darkMode = ref(true)
    const { useAuthUser, initAuth, useAuthLoading, logout } = useAuth()
    const isAuthLoading = useAuthLoading()
    const { closePostModal, usePostModal, openPostModal, useReplyPost } = usePosts()
    const user = useAuthUser()

    const postModal = usePostModal()
    const emitter = useEmitter()
    const replyPost = useReplyPost()
    const search = ref('')

    emitter.$on('replyPost', (post) => {
        openPostModal(post)
    })

    emitter.$on('toggleDarkMode', () => {
        darkMode.value = !darkMode.value
    })

    onBeforeMount(() => {
        initAuth()
    })

    function handleFormSuccess(post) {
        closePostModal()

        navigateTo({
            path: `/status/${post.id}`
        })
    }

    function handleModalClose() {
        closePostModal()
    }

    function handleOpenPostModal() {
        openPostModal(null)
    }

    function handleUserLogout() {
        logout()
    }

    function handleSearch() {
        useRouter().push({
            path: '/search',
            query: {
                q: search.value
            }
        })
    }
</script>
