import { getPosts } from "~~/server/db/posts"
import { postTransformer } from "~~/server/transformers/post"

export default defineEventHandler(async (event) => {
    const { query } = useQuery(event)

    let primsaQuery = {
        include: {
            author: true,
            mediaFiles: true,
            replies: {
                include: {
                    author: true
                }
            },
            replyTo: {
                include: {
                    author: true
                }
            }
        },
        orderBy: [
            {
                createdAt: 'desc'
            }
        ]
    }

    if (!!query) {
        primsaQuery = {
            ...primsaQuery,
            where: {
                text: {
                    contains: query
                }
            }
        }
    }

    const posts = await getPosts(primsaQuery)


    return {
        posts: posts.map(postTransformer)
    }
})