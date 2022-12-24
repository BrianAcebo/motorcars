import { sendError } from "h3"
import { createUser, getUserByEmail } from "../../db/users.js"
import { userTransformer } from "~~/server/transformers/user.js"

export default defineEventHandler(async (event) => {
    const body = await useBody(event)

    const { username, email, password, repeatPassword, name } = body

    if (!email || !password || !repeatPassword) {
        return sendError(event, createError({ statusCode: 400, statusMessage: 'Invalid params' }))
    }

    // if (!username || !email || !password || !repeatPassword || !name) {
    //     return sendError(event, createError({ statusCode: 400, statusMessage: 'Invalid params' }))
    // }

    if (password !== repeatPassword) {
        return sendError(event, createError({ statusCode: 400, statusMessage: 'Passwords do not match' }))
    }

    const userData = {
        //username,
        email,
        password,
        //name,
        profileImage: 'https://picsum.photos/200/200'
    }

    //const emailExists = await getUserByEmail(email)

    //console.log(emailExists)

    const user = await createUser(userData)

    return {
        body: userTransformer(user)
    }
})