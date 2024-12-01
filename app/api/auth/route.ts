import { NextRequest, NextResponse } from 'next/server'
import { app } from '@/firebase.config.mjs'
import firebaseAdminConfig from '@/firebase-admin.config.mjs'
import { Auth, UserCredential, getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { clearCookie, setCookie } from '@/services/server-services/cookie.service'
import { generateJwtToken, validateJwtToken } from '@/services/server-services/token.service'
import { getUser } from '@/services/server-services/user.service'
import { Credentials } from '@/types/user/types.server'
import Admin from 'firebase-admin'
import { saveEmployeeEmail } from '@/services/server-services/admin.service'

interface UpdateRequest extends NextRequest {
    json: () => Promise<string>
}

interface IUpdateUserCredsPayload {
    newCreds: {
        email?: string
        password?: string
    }
    userId: string
}
export async function POST(req: NextRequest) {
    const auth = getAuth(app)
    try {
        const token = await req.json() // If there isnt body value (aka logout) req.json will throw an error which will cause logout.
        let userCredentials = await validateJwtToken<Credentials>(token)
        return await login(auth, userCredentials)
    } catch (error) {
        return await logout()
    }
}
export async function PUT(req: UpdateRequest) {
    try {
        if (process.env.NODE_ENV === 'production') return NextResponse.json('Success', {status: 200})
        const admin = Admin.initializeApp({
            credential: Admin.credential.cert(firebaseAdminConfig as Admin.ServiceAccount),
            databaseURL: process.env.SERVICE_KEY
        });
        const token = await req.json()
        const userNewCred = await validateJwtToken<IUpdateUserCredsPayload>(token)
        await Promise.all([
            // Todo: Add transaction handling the race condition over here
            admin.auth().updateUser(userNewCred.userId, {
                    ...userNewCred.newCreds
                }),
            saveEmployeeEmail(userNewCred.userId, userNewCred.newCreds.email)
        ])
        return NextResponse.json('Success', {status: 200})
    } catch (error) {
        console.log({error})
        return new NextResponse(error, { status: 500 })
    }
}

export async function GET(req: NextRequest) {
    const uid = req.headers.get('uid')
    if (!uid) return NextResponse.json(false)
    try {
        const user = await getUser(uid)
        return NextResponse.json(user, { status: 200 })
    } catch (error) {
        console.log('GET_USER - couldnt get loggedin user', error)
        return NextResponse.json(`couldnt get loggedin user - ${error}`, { status: 500 })
    }
}

const logout = async () => {
    try {
        await clearCookie('loggedInUserToken')
        return NextResponse.json('', {status:200})
   } catch(error) {
       console.log('POST_AUTH - couldnt logout', error)
       return new NextResponse(`Couldnt logout, Error - ${error}`, { status: 500 })
   }
}
const login = async (auth: Auth, UserCredentials: Credentials) => {
    try {
        let { user }: UserCredential = await signInWithEmailAndPassword(auth, UserCredentials.email, UserCredentials.password)
        const jwtIdToken = await generateJwtToken(user.uid)
        const loggedInUser = await getUser(user.uid)
        await setCookie('loggedInUserToken', jwtIdToken)
        return NextResponse.json(loggedInUser, { status: 200 })
    } catch (error) {
        console.log('POST_AUTH - couldnt login', error)
        return new NextResponse(`Couldnt login, Error - ${error}`, { status: 500 })
    }
}


