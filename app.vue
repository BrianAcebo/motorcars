<template>
    <div :class="{ 'dark': darkMode }">
        <div class="bg-white dark:bg-dim-900">

            <LoadingPage v-if="isAuthLoading" />

            <!-- App -->
            <div v-else-if="user" clas="min-h-full">

                <div class="flex justify-around mx-auto lg:max-w-[1440px] lg:px-6">

                    <!-- Left sidebar -->
                    <div
                        id="leftMain"
                        @click="toggleSidebar('left', $event)"
                        :class="[defaultTransition, sidebarLeftClasses]"
                        class="flex justify-start bg-black bg-opacity-25 w-full xs:w-2/3 md:w-1/6 scrollbar-hide overflow-scroll h-screen top-0 fixed md:static z-50 bg-white/80 backdrop-blur-md dark:bg-dim-900/80 dark:text-white"
                    >
                        <div :class="mainBorderColor" class="border-r sticky right-0 top-0 w-4/5 xs:w-full bg-white dark:bg-dim-900 p-4 md:p-0 scrollbar-hide overflow-scroll">
                            <div class="lg:hidden block w-8 h-8 mb-3 p-2 rounded-full bg-gray-100 dark:bg-dim-800 cursor-pointer" @click="toggleSidebar('left')">
                                <XIcon />
                            </div>
                            <SidebarLeft :user="user" />
                        </div>
                    </div>

                    <!-- Main content -->
                    <main class="w-full md:w-4/6 px-0 md:px-7 pt-0 md:pt-8">
                        <div
                            :class="[defaultTransition, mobileTopNavPadding]"
                            class="z-40 bg-white/80 backdrop-blur-md dark:bg-dim-900/80 flex md:hidden sticky top-0 w-full items-center justify-between text-white"
                        >
                            <div class="w-6 h-6" @click="toggleSidebar('left')">
                                <UserIcon />
                            </div>

                            <div class="w-10 h-10">
                                <LogoMain />
                            </div>
                            
                            <div class="w-6 h-6" @click="toggleSidebar('right')">
                                <MenuAlt4Icon />
                            </div>
                        </div>

                        <div class="hidden md:block w-full">
                            <UISearchBar />
                        </div>

                        <div class="flex justify-around">
                            <div class="w-full xs:w-4/6 m-0 xs:mr-7">
                                <router-view />
                            </div>

                            <div class="hidden xs:block w-2/6">
                                <SidebarNews />
                            </div>
                        </div>

                        <div class="fixed xl:hidden right-5 bottom-5">
                            <UIButton @click="handleOpenPostModal">
                                <div class="w-6 h-6 font-bold">
                                    <PencilIcon />
                                </div>
                            </UIButton>
                        </div>
                    </main>

                    <!-- Right Sidebar -->
                    <div
                        id="rightMain"
                        @click="toggleSidebar('right', $event)"
                        :class="[defaultTransition, sidebarRightClasses]" 
                        class="flex justify-end bg-black bg-opacity-25 w-full xs:w-2/3 md:w-1/4 mt-0 md:mt-7 h-screen top-0 fixed md:static z-50 bg-white/80 backdrop-blur-md dark:bg-dim-900/80 dark:text-white"
                    >
                        <div
                            :class="mainBorderColor" 
                            class="cursor-pointer border-l sticky right-0 top-0 w-4/5 xs:w-full bg-white dark:bg-dim-900 p-4 md:p-0 scrollbar-hide overflow-scroll"
                        >
                            <div class="lg:hidden block w-8 h-8 mb-3 p-2 rounded-full bg-gray-100 dark:bg-dim-400 cursor-pointer float-right">
                                <XIcon />
                            </div>
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
    import { MenuAlt4Icon, UserIcon, XIcon, PencilIcon } from '@heroicons/vue/outline';

    const darkMode = ref(true)
    const { useAuthUser, initAuth, useAuthLoading, logout } = useAuth()
    const isAuthLoading = useAuthLoading()
    const { closePostModal, usePostModal, openPostModal, useReplyPost } = usePosts()
    const user = useAuthUser()

    const postModal = usePostModal()
    const emitter = useEmitter()
    const emits = defineEmits(['onPost'])
    const replyPost = useReplyPost()

    const { defaultTransition, mainBorderColor } = useTailwindConfig()

    const mobileTopNavPadding = ref('px-4 py-4')

    onMounted(() => {
        window.addEventListener('scroll', () => {
            mobileTopNavPadding.value = window.scrollY == 0 ? 'px-4 py-4' : 'px-4 py-0'
        });
    })

    const sidebarLeftClasses = ref('left-[-100%]');
    const sidebarRightClasses = ref('right-[-100%]');
    const leftSidebarOpen = ref(false)
    const rightSidebarOpen = ref(false)

    const toggleSidebar = (dir, e) => {

        const outsideClick = e && ((dir == 'right' && e.target.id != 'rightMain') || (dir == 'left' && e.target.id != 'leftMain'));

        if (outsideClick) return false;

        if (dir === 'left') {
            leftSidebarOpen.value = !leftSidebarOpen.value
            sidebarLeftClasses.value = leftSidebarOpen.value ? 'left-0' : 'left-[-100%]'
        }

        if (dir === 'right') {
            rightSidebarOpen.value = !rightSidebarOpen.value
            sidebarRightClasses.value = rightSidebarOpen.value ? 'right-0' : 'right-[-100%]'
        }

        if (dir === '') {
            rightSidebarOpen.value = false
            sidebarRightClasses.value = 'right-[-100%]'
            
            leftSidebarOpen.value = false
            sidebarLeftClasses.value = 'left-[-100%]'
        }
    } 

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
</script>
