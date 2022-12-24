import { getUserByUsername, getUserByEmail } from "../../db/users.js"
import bcrypt from "bcrypt"
import { generateTokens, sendRefreshToken } from "../../utils/jwt.js"
import { userTransformer } from "~~/server/transformers/user.js"
import { createRefreshToken } from "../../db/refreshTokens.js"
import { sendError } from "h3"

export default defineEventHandler(async (event) => {
    const body = await useBody(event)

    const { usernameOrEmail, password } = body

    if (!usernameOrEmail || !password) {
        return sendError(event, createError({
            statusCode: 400,
            statusMessage: 'Ivalid params'
        }))
    }

    console.log("1")
    let user = await getUserByUsername(usernameOrEmail)

    if (!user) {
        console.log("2")
        user = await getUserByEmail(usernameOrEmail)

        if (!user) {
            return sendError(event, createError({
                statusCode: 400,
                statusMessage: "Sorry, user not found."
            }))
        }
    }

    const doesThePasswordMatch = await bcrypt.compare(password, user.password)

    if (!doesThePasswordMatch) {
        return sendError(event, createError({
            statusCode: 400,
            statusMessage: "Sorry, user not found."
        }))
    }

    const { accessToken, refreshToken } = generateTokens(user)

    await createRefreshToken({
        token: refreshToken,
        userId: user.id
    })

    sendRefreshToken(event, refreshToken)

    return {
        access_token: accessToken, 
        user: userTransformer(user)
    }

}) 