<template>
    <div clas="flex flex-col sticky top-9">

        <!-- Preview Card : You might like -->
        <SidebarNewsPreviewCard title="You Might Like">
            <SidebarNewsPreviewCardItem v-for="whatsHappening in whatsHappeningItems">
                <div>
                    <p class="font-semibold text-gray-800 text-md dark:text-white">{{ whatsHappening.title }}</p>

                    <p class="text-xs text-gray-400">
                        {{ whatsHappening.count }}
                    </p>
                </div>
            </SidebarNewsPreviewCardItem>
        </SidebarNewsPreviewCard>

        <!-- Preview Card : What's happening -->
        <SidebarNewsPreviewCard title="What's happening">
            <SidebarNewsPreviewCardItem v-for="whatsHappening in whatsHappeningItems">
                <div>
                    <p class="font-semibold text-gray-800 text-md dark:text-white">{{ whatsHappening.title }}</p>

                    <p class="text-xs text-gray-400">
                        {{ whatsHappening.count }}
                    </p>
                </div>
            </SidebarNewsPreviewCardItem>
        </SidebarNewsPreviewCard>

        <!-- Preview Card : Recent news -->
        <SidebarNewsPreviewCard title="Recent News">
            <SidebarNewsPreviewCardItem>
                <div>
                    <p class="font-semibold text-gray-800 text-md dark:text-white">SpaceX</p>

                    <p class="text-xs text-gray-400">
                        18.k Posts
                    </p>
                </div>
            </SidebarNewsPreviewCardItem>
        </SidebarNewsPreviewCard>

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