'use server'
import { app } from "@/firebaseConfig.mjs";
import { getCookie } from "@/services/server-services/cookie.service";
import { NextResponse } from "next/server";
export async function GET() {
    // Todo: Apply it in middleware instead of checking everytime for loggedInUser - wait a sec not yet..... need to check the user context and its durbillity across refreshes
    try {
        const cookieCheck = await getCookie('loggedInUser')
        console.log('==================>', cookieCheck)
    } catch (error) {
        console.log('couldnt verify id token', error)
    }
    // const secret = request.nextUrl.searchParams.get('secret')
    // const tag = request.nextUrl.searchParams.get('tag')
    await new Promise(resolve => setTimeout(resolve, 3000))
    return NextResponse.json(null)
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

// return NextResponse.json({
//     id: 'ff2646',name: 'Wolt', email: 'WoltAdmin@gmail.com', applicationTime: { day: 6, time: "1630" }, employees: ['4541', '9992', '1287'],
//     employerMsg: ['Check your Shifts', 'Party Tommrow'
//         , 'See whos working with you today',
//         'Memorial day weekend is coming',
//         'Morning shift - Check the kitchen',
//         'Closers - Dont forget to put up the alarm'
//         , 'Remmeber the happening is on friday', 'Remmber to order taxi']
// }
// )
