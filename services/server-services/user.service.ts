'use server'

import { queryOne } from "./db.service"

export const getUser = async (uid: string) => {
    try {
        let user = await queryOne<Employee | Employer>(`users/${uid}`)
        
        if (user.hasOwnProperty('employees')) {
            user = { id: uid, ...user }
        }
        else if (user.hasOwnProperty('employerId')) {
            let { name, applicationTime, employerMsg } = await queryOne<Employer>(`users/${(user as Employee).employerId}`)
            user = { id: uid, ...user, employer: { id: (user as Employee).employerId, name, applicationTime, employerMsg } }
        }
        return user
    } catch (error) {
        console.log('USER_SERVICE - couldnt get user from database', error)
        throw new Error(`USER_SERVICE - couldnt get user from database - ${error}`)
    }
}

