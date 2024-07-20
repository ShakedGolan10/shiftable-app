import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";

export async function GET(request: NextRequest & NextApiRequest) {
    const uid = request.headers.get('uid')
    const userId = [request.nextUrl.searchParams ,request.query]
    console.log('in here:', userId)
        try {
            return NextResponse.json('user', { status: 200 })
        } catch (error) {
            console.log('GET_USER - couldnt get loggedin user', error)
            return NextResponse.json(`couldnt get loggedin user - ${error}`, { status: 500 })
    }
}

 
