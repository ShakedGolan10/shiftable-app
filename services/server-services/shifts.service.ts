
import { Application_Rules, Employer, WeeklyWorkflow } from "@/types/user/types.server"
import { queryOne, queryOneField } from "./db.service"

export const getUserApplicableShifts = async (uid: string, employerId: string) => {
   const application_rules = await queryOneField<Application_Rules>(`users/${employerId}`, 'application_rules')
   const applicable_shifts = await queryOne<WeeklyWorkflow>(`users/${employerId}/applicable_shifts/${uid}`)
    return { application_rules, applicable_shifts }
}


