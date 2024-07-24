import { NextRequest, NextResponse } from 'next/server';
import { validateJwtToken } from './services/server-services/token.service';
import { getCookie } from './services/server-services/cookie.service';
import { AuthenticatedRequest } from './lib/backend_handler';

export async function middleware(req: NextRequest) {
    if (req.url.includes('auth')) return NextResponse.next(); // if auth request let the req throw
    // return NextResponse.next()
    const newHeaders = new Headers(req.headers)
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
            throw new Error('at middleware, cant validate user!');
        }
    } catch (error) {
        return NextResponse.json(`${error}`, { status: 401 })
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/api/:path*']
};
