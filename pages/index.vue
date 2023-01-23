<template>
    <div>
        <MainSection title="Home" :loading="loading">

            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
                <Title>Home | Motorcars</Title>
            </Head>

            <div class="border-b" :class="mainBorderColor">
                <PostForm :user="user" @on-success="handleFormSuccess" />
            </div>

            <PostListFeed :posts="homePosts" />

        </MainSection>
    </div>
</template>
<script setup>
const { mainBorderColor } = useTailwindConfig()
const { getPosts } = usePosts()

const loading = ref(false)
const homePosts = ref([])
const { useAuthUser } = useAuth()

const user = useAuthUser()

onBeforeMount(async () => {
    loading.value = true
    try {
        const { posts } = await getPosts()

        homePosts.value = posts
    } catch (error) {
        console.log(error)
    } finally {
        loading.value = false
    }
})

function handleFormSuccess(post) {
    navigateTo({
        path: `/post/${post.id}`
    })
}

</script>