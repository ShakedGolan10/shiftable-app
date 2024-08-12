import { NextResponse } from "next/server";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { AuthenticatedRequest } from "@/lib/backend_handler";
import { getEmployeesShiftsReqs } from "@/services/server-services/employer.service";

export async function GET(req: AuthenticatedRequest, { params } : { params: Params }) {
    try {
        const { forDate } = params
        const uid = req.headers.get('uid')
        const shiftsReqData = await getEmployeesShiftsReqs(uid, forDate)
        console.log('at server: ', forDate, shiftsReqData)
        return NextResponse.json(shiftsReqData, { status: 200 })
    } catch (error) {
            console.log('GET - couldnt get employer shifts req', error)
            return NextResponse.json(`couldnt get employer shifts req - ${error}`, { status: 500 })
    }
}
