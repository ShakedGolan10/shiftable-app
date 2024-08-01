import { fetchService } from "./fetch.service"

export const getUserApplicableShiftsData = async (employerId: string) => {
    const data = await fetchService.GET<{applicationRules: ApplicationRules, applicableShifts: WeeklyWorkflow}>(`shift_application/${employerId}`)
    return data
}

