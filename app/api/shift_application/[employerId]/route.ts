import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
import { AuthenticatedRequest } from "@/lib/backend_handler";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export async function GET(req: AuthenticatedRequest, { params } : { params: Params }) {
    try {
        const uid = req.headers.get('uid')
        const { employerId } = params
        return NextResponse.json('user', { status: 200 })
    } catch (error) {
            console.log('GET_USER - couldnt get loggedin user', error)
            return NextResponse.json(`couldnt get loggedin user - ${error}`, { status: 500 })
    }
}

 
