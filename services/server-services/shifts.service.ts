
import { ApplicationRules, Employer, WeeklyWorkflow } from "@/types/user/types.server"
import { queryOne, queryOneField } from "./db.service"

export const getUserApplicableShifts = async (uid: string, employerId: string) => {
   const applicationRules = await queryOneField<ApplicationRules>(`users/${employerId}`, 'application_rules')
   const applicableShifts = await queryOne<WeeklyWorkflow>(`users/${employerId}/applicable_shifts/${uid}`)
    return { applicationRules, applicableShifts }
}


