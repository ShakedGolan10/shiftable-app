import { NextResponse } from "next/server";

export async function GET() {

    // const secret = request.nextUrl.searchParams.get('secret')
    // const tag = request.nextUrl.searchParams.get('tag')
    await new Promise(resolve => setTimeout(resolve, 3000))
    return NextResponse.json({
        name: 'Shaked', email: 'Shaked.f@gmail.com', employer: {
            name: 'Wolt', applicationDay: 3, employerMsg: ['Check your Shifts', 'Party Tommrow'
                , 'See whos working with you today',
                'Memorial day weekend is coming',
                'Morning shift - Check the kitchen',
                'Closers - Dont forget to put up the alarm'
                , 'Remmeber the happening is on friday', 'Remmber to order taxi']
        }
    })
    //{ username: 'Shak', isAdmin: false }
    //   todo: Coennect firebase in here
}