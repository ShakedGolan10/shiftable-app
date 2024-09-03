import { NextRequest, NextResponse } from 'next/server';
import { validateJwtToken } from './services/server-services/token.service';
import { getCookie } from './services/server-services/cookie.service';

export async function middleware(req: NextRequest) {
    if (req.url.includes('auth') && req.method === 'POST') return NextResponse.next(); // if auth request of login/logout - Next()
    const newHeaders = new Headers(req.headers)
    
    try {
        const jwtEncryptedToken = await getCookie('loggedInUserToken')
        if (req.url.includes('auth') && req.method === 'GET') {
            if (jwtEncryptedToken) {
                return setUidHeaders(newHeaders, jwtEncryptedToken)
            } else {
                return NextResponse.next()
            }
        } else if (jwtEncryptedToken) return setUidHeaders(newHeaders, jwtEncryptedToken)
            else {
                throw new Error('at middleware, cant validate user!');
            }
    } catch (error) {
        return NextResponse.redirect('/')
    }
}

async function setUidHeaders(headers: Headers, jwtToken: string | true) {
    try {
        const uid = await validateJwtToken(jwtToken)
        headers.set('uid', uid)
        return NextResponse.next({
            request: {
                headers
            }
        })
    } catch (error) {
        throw new Error(`at middleware, cant set uid header with error: ${error}`);   
    }
} 



// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/api/:path*']
};
