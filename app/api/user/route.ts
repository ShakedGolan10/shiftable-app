import { NextRequest, NextResponse } from "next/server";
import { getUser } from "@/services/server-services/user.service";

export async function GET(request: NextRequest) {
    const uid = request.headers.get('uid')
    const userId = request.nextUrl.searchParams.get('userId')
    if (userId) {
        try {
            // Todo: handle the get user (not loggedInUser)
        } catch (error) {
            console.log('GET_USER - couldnt get user', error)
            return NextResponse.json(`couldnt get user - ${error}`, { status: 500 })
        }
    }
    else {
        try {
            const user = await getUser(uid)
            return NextResponse.json(user, { status: 200 })
        } catch (error) {
            console.log('GET_USER - couldnt get loggedin user', error)
            return NextResponse.json(`couldnt get loggedin user - ${error}`, { status: 500 })
        }
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
