import { NextRequest, NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'
import { getAuth } from 'firebase/auth'
import { createUserWithEmailAndPassword } from 'firebase/auth/cordova'
import { app } from '@/firebaseConfig'


export async function POST(request: NextRequest) {
    const { email, password } = await request.json()
    // console.log(email, password)
    let user: any
    const auth = getAuth(app)
    await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log('in server', userCredential)
            // console.log('in server', auth)
            user = userCredential.user
        })
    // const secret = request.nextUrl.searchParams.get('secret')
    // const tag = request.nextUrl.searchParams.get('tag')
    // { email, password }
    return NextResponse.json(user)
    //   todo: Coennect firebase in here
}