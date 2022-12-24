<template>
    <div clas="flex flex-col">

        <!-- Preview Card : What's happening -->
        <SidebarRightPreviewCard title="You Might Like">
            <SidebarRightPreviewCardItem v-for="whatsHappening in whatsHappeningItems">
                <div>
                    <h2 class="font-bold text-gray-800 text-md dark:text-white">{{ whatsHappening.title }}</h2>

                    <p class="text-xs text-gray-400">
                        {{ whatsHappening.count }}
                    </p>
                </div>
            </SidebarRightPreviewCardItem>
        </SidebarRightPreviewCard>

        <!-- Preview Card : What's happening -->
        <SidebarRightPreviewCard title="What's happening">
            <SidebarRightPreviewCardItem v-for="whatsHappening in whatsHappeningItems">
                <div>
                    <h2 class="font-bold text-gray-800 text-md dark:text-white">{{ whatsHappening.title }}</h2>

                    <p class="text-xs text-gray-400">
                        {{ whatsHappening.count }}
                    </p>
                </div>
            </SidebarRightPreviewCardItem>
        </SidebarRightPreviewCard>

        <!-- Preview Card : What's happening -->
        <SidebarRightPreviewCard title="Recent News">
            <SidebarRightPreviewCardItem>
                <div>
                    <h2 class="font-bold text-gray-800 text-md dark:text-white">SpaceX</h2>

                    <p class="text-xs text-gray-400">
                        18.k Posts
                    </p>
                </div>
            </SidebarRightPreviewCardItem>
        </SidebarRightPreviewCard>

    </div>
</template>
<script setup>
const emitter = useEmitter()

const whatsHappeningItems = ref([
    {
        title: 'SpaceX',
        count: '18.8k Posts'
    },
    {
        title: '#CodingIsFun',
        count: '8.8k Posts'
    },
    {
        title: '#artforall',
        count: '1.8k Posts'
    }
])
</script>