import { prisma } from ".";


export const createPost = (postData) => {
    return prisma.post.create({
        data: postData
    })
}

export const getPosts = (params = {}) => {
    return prisma.post.findMany({
        ...params
    })
}

export const getPostById = (postId, params = {}) => {
    return prisma.post.findUnique({
        ...params,
        where: {
            ...params.where,
            id: postId
        },
    })
}