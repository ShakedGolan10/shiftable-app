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
interface ICreateUserPayload {
    name: string
    email: string
    password: string
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
export async function POST(req: IUpdateRequest) {
    try {
          const token = await req.json()
          const {name, email, password} = await validateJwtToken<ICreateUserPayload>(token)
          // Todo: Create a function that signup a new user and then takes the newId and create a user at db users collection
        return NextResponse.json('Success', {status: 200})
    } catch (error) {
        console.log({error})
        return new NextResponse(error, { status: 500 })
    }
}
