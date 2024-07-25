import { fetchService } from "./fetch.service"

export const getUserApplicableShiftsData = async (employerId: string) => {
    try {
        const data = await fetchService.GET<{application_rules: Application_Rules, applicable_shifts: WeeklyWorkflow}>(`shift_application/${employerId}`)
        return data
    } catch (error) {
        console.log(error)
    }
}