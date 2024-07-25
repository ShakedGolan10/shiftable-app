import { fetchService } from "./fetch.service"

export const getUserApplicableShiftsData = async (employerId: string) => {
    const data = await fetchService.GET<{application_rules: Application_Rules, applicable_shifts: WeeklyWorkflow}>(`shift_application/${employerId}`)
    return data
}

