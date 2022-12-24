export default () => {

    const usePostModal = () => useState('post_modal', () => false)
    const useReplyPost = () => useState('reply_post', () => null)

    const closePostModal = () => {
        const postModal = usePostModal()
        postModal.value = false
    }

    const setReplyTo = (post) => {
        const replyPost = useReplyPost()
        replyPost.value = post
    }

    const openPostModal = (post = null) => {
        const postModal = usePostModal()
        postModal.value = true

        setReplyTo(post)
    }

    const makePost = (formData) => {
        const form = new FormData()

        form.append('text', formData.text)
        form.append('replyTo', formData.replyTo)

        formData.mediaFiles.forEach((mediaFile, index) => {
            form.append('media_file_' + index, mediaFile)
        })

        return useFetchApi('/api/user/posts', {
            method: 'POST',
            body: form
        })
    }

    const getPosts = (params = {}) => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await useFetchApi('/api/posts', {
                    method: 'GET',
                    params
                })

                resolve(response)
            } catch (error) {
                reject(error)
            }
        })
    }

    const getPostById = (postId) => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await useFetchApi(`/api/posts/${postId}`)

                resolve(response)
            } catch (error) {
                reject(error)
            }
        })
    }

    return {
        makePost,
        getPosts,
        getPostById,
        closePostModal,
        usePostModal,
        openPostModal,
        useReplyPost
    }
}