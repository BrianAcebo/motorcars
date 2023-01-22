import { sendError } from "h3"
import { createUser, getUserByEmail } from "../../db/users.js"
import { userTransformer } from "~~/server/transformers/user.js"

export default defineEventHandler(async (event) => {
    const body = await useBody(event)

    const { username, email, password, repeatPassword, name } = body

    if (!email || !password || !repeatPassword) {
        return sendError(event, createError({ statusCode: 400, statusMessage: 'Please fill fields out entirely' }))
    }

    if (password !== repeatPassword) {
        return sendError(event, createError({ statusCode: 400, statusMessage: 'Passwords do not match' }))
    }

    const userData = {
        email,
        password,
        profileImage: 'https://res.cloudinary.com/motorcars-cloudinary/image/upload/v1674419596/no-profile-image.jpg'
    }

    const emailExists = await getUserByEmail(email)

    if (emailExists) {
        return sendError(event, createError({ statusCode: 400, statusMessage: 'That email address is already taken' }))
    }

    const user = await createUser(userData)

    return {
        body: userTransformer(user)
    }
})