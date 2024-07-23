import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
import { AuthenticatedRequest } from "@/lib/backend_handler";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export async function GET(req: AuthenticatedRequest, { params } : { params: Params }) {
    const uid = req.headers.get('uid')
    console.log('the uid:', uid)
    console.log('the params :', params)
    const { employerId } = params
    console.log('s:', employerId)
    return NextResponse.json('user', { status: 200 })
    // const userId = [request.nextUrl.searchParams ,request.query]
    // console.log('in here:', userId)
    //     try {
    //     } catch (error) {
    //         console.log('GET_USER - couldnt get loggedin user', error)
    //         return NextResponse.json(`couldnt get loggedin user - ${error}`, { status: 500 })
    // }
}

 
