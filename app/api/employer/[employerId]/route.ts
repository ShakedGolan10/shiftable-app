import { AuthenticatedRequest } from "@/lib/backend_handler"
import { getDataFromQueryParams } from "@/lib/server.utils"
import { getEmployees } from "@/services/server-services/employer.service"
import { Params } from "next/dist/shared/lib/router/utils/route-matcher"
import { NextResponse } from "next/server"

export async function GET(req: AuthenticatedRequest, { params } : { params: Params }) {
    try {
        const uid = req.headers.get('uid')
        const { employerId } = params
        const queryParams = getDataFromQueryParams(req.nextUrl.searchParams)
        const data = await getEmployees(queryParams, employerId)
        return NextResponse.json(data, { status: 200 })
    } catch (error) {
            console.log('GET - couldnt get employees', error)
            return NextResponse.json(`couldnt get employees - ${error}`, { status: 500 })
    }
}