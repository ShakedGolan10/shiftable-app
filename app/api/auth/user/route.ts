import { NextRequest, NextResponse } from 'next/server'
import { validateJwtToken } from '@/services/server-services/token.service'
import { saveEmployeeName, signupNewEmployee } from '@/services/server-services/admin.service'

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
    employerId: string
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
        const { name, email, password, employerId } = await validateJwtToken<ICreateUserPayload>(token)
        const newEmployee = await signupNewEmployee(email, password, name, employerId)
        return NextResponse.json(newEmployee, {status: 200})
    } catch (error) {
        console.log({error})
        return new NextResponse(error, { status: 500 })
    }
}