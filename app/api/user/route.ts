import { NextRequest, NextResponse } from "next/server";
import { getUser } from "@/services/server-services/user.service";
import { AuthenticatedRequest } from "@/lib/backend_handler";

export async function GET(req: AuthenticatedRequest) {
    const uid = req.headers.get('uid')
    const userId = req.nextUrl.searchParams.get('userId')
        try {
            // Todo: handle the get user (not loggedInUser)
        } catch (error) {
            console.log('GET_USER - couldnt get user', error)
            return NextResponse.json(`couldnt get user - ${error}`, { status: 500 })
        }
    }
   