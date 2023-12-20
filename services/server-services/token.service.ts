'use server'
import { User } from "firebase/auth";
import * as jose from "jose";

const secret = (process.env.NODE_ENV === 'production') ? jose.base64url.decode('a') /* Need to adjust it to production env */ : jose.base64url.decode(`${process.env.REACT_APP_SECRET}`)

export const generateJwtToken = async (userId: string): Promise<string> => {
    try {
        const jwtEncrypted = await new jose.EncryptJWT({ userId })
            .setProtectedHeader({ alg: 'dir', enc: 'A128CBC-HS256' })
            .setIssuedAt()
            .setIssuer('urn:example:issuer')
            .setAudience('urn:example:audience')
            .setExpirationTime('30m')
            .encrypt(secret)
        console.log('=======>', jwtEncrypted)
        return jwtEncrypted
    } catch (error) {
        console.log(error)
    }
}


export const validateJwtToken = async (token: string) => {
    try {
        const jwtDecryptToken = await jose.jwtDecrypt(token, secret)
        console.log('//////////>', jwtDecryptToken)
        return jwtDecryptToken.payload.userId
        // await jose.jwtVerify(token, secret)
    } catch (error) {
        console.log(error)
    }
}



// const secret = new TextEncoder().encode(
//     'cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2',
// )
// const alg = 'HS256'
// const jwt = await new jose.SignJWT({ name: 'aa', age: 5 }).setProtectedHeader({ alg })
//     .setIssuedAt()
//     .setIssuer('Admin')
//     .setAudience('User')
//     .setExpirationTime('30m')
//     .sign(secret)