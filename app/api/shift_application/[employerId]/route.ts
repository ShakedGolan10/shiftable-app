import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
import { ApplyShiftsRequest, AuthenticatedRequest } from "@/lib/backend_handler";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { getUserApplicableShifts, postUserShiftsRequest } from "@/services/server-services/shifts.service";

export async function GET(req: AuthenticatedRequest, { params } : { params: Params }) {
    try {
        const uid = req.headers.get('uid')
        const { employerId } = params
        const shiftsData = await getUserApplicableShifts(uid, employerId)
        return NextResponse.json(shiftsData, { status: 200 })
    } catch (error) {
            console.log('GET - couldnt get user ApplicableShifts', error)
            return NextResponse.json(`couldnt get user ApplicableShifts - ${error}`, { status: 500 })
    }
}

export async function POST(req: ApplyShiftsRequest, { params } : { params: Params }) {
    try {
        const uid = req.headers.get('uid')
        const { employerId } = params
        const { forDate, appliedShifts } = await req.json()
        const postRes = await postUserShiftsRequest(uid, employerId, forDate, appliedShifts)
        return NextResponse.json('Shifts applied successfuly', { status: 200 })
    } catch (error) {
            console.log('POST - couldnt post user shifts request', error)
            return NextResponse.json(`couldnt post user shifts request - ${error}`, { status: 500 })
    }
}

 
