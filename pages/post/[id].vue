<template>
    <div>
        <MainSection title="Post" :loading="loading">
            <Head>
                <Title>Post by @briancebo | Motorcars</Title>
            </Head>

            <PostDetails :user="user" :post="post" />
        </MainSection>
    </div>
</template>

<script setup>
    const loading = ref(false)
    const post = ref(null)
    const { getPostById } = usePosts()
    const { useAuthUser } = useAuth()
    const user = useAuthUser()


    watch(() => useRoute().fullPath, () => getPost())

    function getPostIdFromRoute() {
        return useRoute().params.id
    }

    async function getPost() {
        loading.value = true
        try {
            const response = await getPostById(getPostIdFromRoute())

            post.value = response.post
        } catch (error) {
            console.log(error);
        } finally {
            loading.value = false
        }
    }

    onBeforeMount(() => {
        getPost()
    })
</script>