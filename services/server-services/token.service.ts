'use server'
import * as jose from "jose";

const secret = jose.base64url.decode(process.env.JWT_SECRET)
export const generateJwtToken = async (userId: string): Promise<string> => {
    try {
        const jwtEncrypted = await new jose.EncryptJWT({ userId })
            .setProtectedHeader({ alg: 'dir', enc: 'A128CBC-HS256' })
            .setIssuedAt()
            .setIssuer('urn:example:issuer')
            .setAudience('urn:example:audience')
            .setExpirationTime('30m')
            .encrypt(secret)
        return jwtEncrypted
    } catch (error) {
        console.log(error)
        throw new Error('token-service: Could\'nt generate JWT token')

    }
}



export const validateJwtToken = async (token: any): Promise<string> => {
    try {
        const { payload } = await jose.jwtDecrypt(token, secret, {
            issuer: 'urn:example:issuer',
            audience: 'urn:example:audience',
        })
        return payload.userId as string
    } catch (error) {
        console.log(error)
        throw new Error('token-service: Could\'nt validate JWT token')

    }
}
