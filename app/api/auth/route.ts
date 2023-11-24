import { NextRequest, NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { createUserWithEmailAndPassword } from 'firebase/auth/cordova'
import { app } from '@/firebaseConfig'


export async function POST(request: NextRequest) {
    // Todo: Provide the response with the following classes: Employee Or Employer 
    const { email, password } = await request.json()
    let user: any
    const auth = getAuth(app)
    await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            user = userCredential.user
        })
    // const secret = request.nextUrl.searchParams.get('secret')
    // const tag = request.nextUrl.searchParams.get('tag')
    return NextResponse.json(user)
}