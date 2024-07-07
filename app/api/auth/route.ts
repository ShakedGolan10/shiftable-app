import { NextRequest, NextResponse } from 'next/server'
import { app } from '@/firebaseConfig.mjs'
import { UserCredential, getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { clearCookie, setCookie } from '@/services/server-services/cookie.service'
import { generateJwtToken } from '@/services/server-services/token.service'
import { getUser } from '@/services/server-services/user.service'

export async function POST(request: NextRequest) {
    const auth = getAuth(app)
    const UserCredentials = await request.json()
    if (!UserCredentials) { // LOGOUT
        try {
             await clearCookie('loggedInUserToken')
             return  NextResponse.json('Logged out', { status: 200 })
        } catch(error) {
            console.log('POST_AUTH - couldnt login', error)
            return new NextResponse(`Couldnt logout, Error - ${error}`, { status: 500 })
        }
    } else try { // LOGIN
        let { user }: UserCredential = await signInWithEmailAndPassword(auth, UserCredentials.email, UserCredentials.password)
        const jwtIdToken = await generateJwtToken(user.uid)
        user = await getUser(user.uid)
        await setCookie('loggedInUserToken', jwtIdToken)
        // Try to return new NextResponse as last result (with set cookie header)
        return NextResponse.json(user, { status: 200 })
    } catch (error) {
        console.log('POST_AUTH - couldnt login', error)
        return new NextResponse(`Couldnt login, Error - ${error}`, { status: 500 })
    }
}

