import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { validateJwtToken } from './services/server-services/token.service'
import { getCookie } from './services/server-services/cookie.service'
import { getUser } from './services/server-services/user.service'
import { headers } from 'next/headers'
 
export async function middleware(request: NextRequest) {
    if (request.nextUrl.pathname.includes('auth')) return NextResponse.next() // if auth request let the req throw
    const newHeaders = new Headers(request.headers)
    try {
        const jwtEncryptedToken = await getCookie('loggedInUserToken')
        if (jwtEncryptedToken) {
            const uid = await validateJwtToken(jwtEncryptedToken)
            newHeaders.set('uid', uid)
            return NextResponse.next({
                request: {
                    headers: newHeaders
                }})
        } else {
            throw new Error('at middleware, cant validate user! ')
        }
    
    } catch (error) {
        return new NextResponse(`${error}`, { status: 401 })
    }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/api/:path*']
}