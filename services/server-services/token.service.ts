'use server'
import * as jose from "jose";

const secret = jose.base64url.decode(process.env.JWT_SECRET)
export const generateJwtToken = async (item: string | object ): Promise<string> => {
    try {
        const jwtEncrypted = await new jose.EncryptJWT({ item })
            .setProtectedHeader({ alg: 'dir', enc: 'A128CBC-HS256' })
            .setIssuedAt()
            .setIssuer('urn:example:issuer')
            .setAudience('urn:example:audience')
            .setExpirationTime('30m')
            .encrypt(secret)

        return jwtEncrypted
    } catch (error) {
        throw new Error('token-service: Could\'nt generate JWT token')

    }
}



export const validateJwtToken = async <T>(token: any): Promise<T> => {
    try {
        const { payload } = await jose.jwtDecrypt(token, secret, {
            issuer: 'urn:example:issuer',
            audience: 'urn:example:audience',
        })
        return payload.item as T
    } catch (error) {
        throw new Error('token-service: Could\'nt validate JWT token')

    }
}
