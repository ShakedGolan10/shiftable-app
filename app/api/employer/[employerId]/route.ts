import { AuthenticatedRequest } from "@/lib/backend_handler"
import { Params } from "next/dist/shared/lib/router/utils/route-matcher"
import { NextResponse } from "next/server"

export async function GET(req: AuthenticatedRequest, { params } : { params: Params }) {
    try {
        const uid = req.headers.get('uid')
        const { employerId } = params
        return NextResponse.json('uid', { status: 200 })
    } catch (error) {
            console.log('GET - couldnt get employees', error)
            return NextResponse.json(`couldnt get employees - ${error}`, { status: 500 })
    }
}