import { NextRequest, NextResponse } from "next/server";
import { getUser } from "@/services/server-services/user.service";
import { AuthenticatedRequest } from "@/lib/backend_handler";

export async function GET(req: AuthenticatedRequest) {
    const uid = req.headers.get('uid')
    const userId = req.nextUrl.searchParams.get('userId')
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