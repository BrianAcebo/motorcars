import { getPostById } from "~~/server/db/posts"
import { postTransformer } from "~~/server/transformers/post"

export default defineEventHandler(async (event) => {

    const { id } = event.context.params

    const post = await getPostById(id, {
        include: {
            author: true,
            mediaFiles: true,
            replyTo: {
                include: {
                    author: true
                }
            },
            replies: {
                include: {
                    mediaFiles: true,
                    author: true,
                    replyTo: {
                        include: {
                            author: true
                        }
                    }
                }
            }
        }
    })

    return {
        post: postTransformer(post)
    }
})