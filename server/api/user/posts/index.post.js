import formidable from "formidable"
import { postTransformer } from "~~/server/transformers/post.js"
import { createPost } from "../../../db/posts.js"
import { createMediaFile } from "../../../db/mediaFiles.js"
import { uploadToCloudinary } from "../../../utils/cloudinary.js"

export default defineEventHandler(async (event) => {

    const form = formidable({})

    const response = await new Promise((resolve, reject) => {
        form.parse(event.req, (err, fields, files) => {
            if (err) {
                reject(err)
            }
            resolve({ fields, files })
        })
    })

    const { fields, files } = response

    const userId = event.context?.auth?.user?.id

    const postData = {
        text: fields.text,
        authorId: userId
    }

    const replyTo = fields.replyTo

    if (replyTo && replyTo !== 'null' && replyTo !== 'undefined') {
        postData.replyToId = replyTo
    }

    const post = await createPost(postData)

    const filePromises = Object.keys(files).map(async key => {
        const file = files[key]

        const cloudinaryResource = await uploadToCloudinary(file.filepath)

        return createMediaFile({
            url: cloudinaryResource.secure_url,
            providerPublicId: cloudinaryResource.public_id,
            userId: userId,
            postId: post.id
        })
    })

    await Promise.all(filePromises)

    return {
        post: postTransformer(post)
    }
})