'use server'

import { NextRequest, NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'
import { UserCredential, getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { app } from '@/firebaseConfig.mjs'
import { setCookie } from '@/services/server-services/cookie.service'
import { generateJwtToken, validateJwtToken } from '@/services/server-services/token.service'
import { getUser } from '@/services/server-services/user.service'

export async function POST(request: NextRequest) {
    const auth = getAuth(app)
    const { email, password } = await request.json()
    try {
        let { user }: UserCredential = await signInWithEmailAndPassword(auth, email, password)
        const jwtIdToken = await generateJwtToken(user.uid)
        user = await getUser(user.uid)
        await setCookie('loggedInUserToken', jwtIdToken)
        return NextResponse.json(user, { status: 200 })
    } catch (error) {
        console.log('POST_AUTH - couldnt login', error)
        return new NextResponse(`Couldnt login, Error - ${error}`, { status: 500 })
    }
}

