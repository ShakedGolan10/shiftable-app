import { NextResponse } from "next/server";

export async function GET() {

    // const secret = request.nextUrl.searchParams.get('secret')
    // const tag = request.nextUrl.searchParams.get('tag')
    await new Promise(resolve => setTimeout(resolve, 3000))
    return NextResponse.json(false)
    //{ username: 'Shak', isAdmin: false }
    //   todo: Coennect firebase in here
}