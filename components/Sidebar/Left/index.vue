<template>
    <div class="flex flex-col h-screen">


        <div class="my-2 w-full" :class="defaultTransition">
            <nuxt-link to="/">
                <div class="text-xs flex justify-start items-center dark:text-white font-heading font-bold uppercase">
                    <div class="w-20 h-20 mr-3">
                        <LogoMain />
                    </div>
                    motorcars.com
                </div>
            </nuxt-link>
        </div>

        <div class="mt-8">
            <div class="space-y-3">
                <SidebarLeftTab active>
                    <template v-slot:icon>
                        <HomeIcon />
                    </template>
                    <template v-slot:name>
                        Home
                    </template>
                </SidebarLeftTab>

                <SidebarLeftTab>
                    <template v-slot:icon>
                        <TruckIcon />
                    </template>
                    <template v-slot:name>
                        Explore
                    </template>
                </SidebarLeftTab>

                <SidebarLeftTab>
                    <template v-slot:icon>
                        <UserGroupIcon />
                    </template>
                    <template v-slot:name>
                        My Groups
                    </template>
                </SidebarLeftTab>

                <SidebarLeftTab>
                    <template v-slot:icon>
                        <IdentificationIcon />
                    </template>
                    <template v-slot:name>
                        My Networks
                    </template>
                </SidebarLeftTab>

                <SidebarLeftTab>
                    <template v-slot:icon>
                        <GlobeAltIcon />
                    </template>
                    <template v-slot:name>
                        Near Me
                    </template>
                </SidebarLeftTab>
            </div>


            <div class="mt-14 space-y-3">
                <SidebarLeftTab>
                    <template v-slot:icon>
                        <UserIcon />
                    </template>
                    <template v-slot:name>
                        Profile
                    </template>
                </SidebarLeftTab>

                <SidebarLeftTab>
                    <template v-slot:icon>
                        <InboxIcon />
                    </template>
                    <template v-slot:name>
                        Messages
                    </template>
                </SidebarLeftTab>

                <SidebarLeftTab>
                    <template v-slot:icon>
                        <BellIcon />
                    </template>
                    <template v-slot:name>
                        Notifications
                    </template>
                </SidebarLeftTab>

                <SidebarLeftTab>
                    <template v-slot:icon>
                        <DotsCircleHorizontalIcon />
                    </template>
                    <template v-slot:name>
                        Settings
                    </template>
                </SidebarLeftTab>
            </div>


            <div class="hidden xl:block mt-20 mx-auto">
                <UIButton liquid size="lg" @on-click="emits('onPost')">
                    <span class="font-bold text-xs">
                        Make Post
                    </span>
                </UIButton>
            </div>

            <div class="block xl:hidden">
                <UIButton @on-click="emits('onPost')">
                    <div class="w-6 h-6 font-bold">
                        <PencilIcon />
                    </div>
                </UIButton>
            </div>

        </div>

    </div>
</template>

<script setup>
    import { HomeIcon } from "@heroicons/vue/solid"
    import { TruckIcon, BellIcon, InboxIcon, UserGroupIcon, UserIcon, DotsCircleHorizontalIcon, PencilIcon, GlobeAltIcon, IdentificationIcon } from "@heroicons/vue/outline"

    const { defaultTransition } = useTailwindConfig()
    const emits = defineEmits(['onPost', 'onLogout'])

    const props = defineProps({
        user: {
            type: Object,
            required: true
        }
    })
</script>