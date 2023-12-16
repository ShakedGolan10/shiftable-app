'use server'

import { NextRequest, NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'
import { UserCredential, getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { app } from '@/firebaseConfig.mjs'
import { setCookie } from '@/services/server-services/cookie.service'
import { generateJwtToken, validateJwtToken } from '@/services/server-services/token.service'

export async function POST(request: NextRequest) {
    // Todo: Provide the response with the following classes: Employee Or Employer 
    try {
        const { email, password } = await request.json()
        const auth = getAuth(app)
        const { user }: UserCredential = await signInWithEmailAndPassword(auth, email, password)
        // Todo: Return the user from firestore based on the uid of the loggedin user
        const jwtIdToken = await generateJwtToken(user.uid)
        const userId = await validateJwtToken(jwtIdToken)
        // console.log('.........>', jwtToken)
        // await setCookie('loggedInUser', jwtToken)
        // const secret = request.nextUrl.searchParams.get('secret')
        // const tag = request.nextUrl.searchParams.get('tag')
        return NextResponse.json({
            id: '4646', name: 'Shaked', email: 'Shaked.f@gmail.com', employer: {
                name: 'Wolt', applicationTime: { day: 3, time: "1630" }, employerMsg: ['Check your Shifts', 'Party Tommrow'
                    , 'See whos working with you today',
                    'Memorial day weekend is coming',
                    'Morning shift - Check the kitchen',
                    'Closers - Dont forget to put up the alarm'
                    , 'Remmeber the happening is on friday', 'Remmber to order taxi']
            }
        })
    } catch (error) {
        console.log('couldnt save cookie', error)
    }
}


// return NextResponse.json({
//     id: '4646',name: 'Shaked', email: 'Shaked.f@gmail.com', employer: {
//         name: 'Wolt', applicationTime: { day: 3, time: "1630" }, employerMsg: ['Check your Shifts', 'Party Tommrow'
//             , 'See whos working with you today',
//             'Memorial day weekend is coming',
//             'Morning shift - Check the kitchen',
//             'Closers - Dont forget to put up the alarm'
//             , 'Remmeber the happening is on friday', 'Remmber to order taxi']
//     }
// })