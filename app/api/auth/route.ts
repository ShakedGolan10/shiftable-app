import { NextRequest, NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'
import { UserCredential, getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { app } from '@/firebaseConfig.mjs'


export async function POST(request: NextRequest) {
    // Todo: Provide the response with the following classes: Employee Or Employer 
    const { email, password } = await request.json()
    const auth = getAuth(app)
    const { user }: UserCredential = await signInWithEmailAndPassword(auth, email, password)

    // Todo: Return the user from firestore based on the uid of the loggedin user
    console.log('-------------->', user.uid) // Have the user id  - done! now to creating user in the firebase with that uid 
    // const secret = request.nextUrl.searchParams.get('secret')
    // const tag = request.nextUrl.searchParams.get('tag')
    return NextResponse.json(user)
}