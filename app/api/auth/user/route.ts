import { NextRequest, NextResponse } from 'next/server'
import { validateJwtToken } from '@/services/server-services/token.service'
import { saveEmployeeName } from '@/services/server-services/admin.service'

interface IUpdateRequest extends NextRequest {
    json: () => Promise<string>
}

interface IUpdateUserPayload {
    userId: string
    name: string
}

export async function PUT(req: IUpdateRequest) {
    try {
          const token = await req.json()
          const {name, userId} = await validateJwtToken<IUpdateUserPayload>(token)
          saveEmployeeName(userId, name)
        return NextResponse.json('Success', {status: 200})
    } catch (error) {
        console.log({error})
        return new NextResponse(error, { status: 500 })
    }
}
