import { TableShifts } from "@/app/main/shifts-application/shifts_apply_table"
import { fetchService } from "./fetch.service"

export const getUserApplicableShiftsData = async (employerId: string) => {
    const data = await fetchService.GET<{applicationRules: ApplicationRules, applicableShifts: WeeklyWorkflow}>(`shift_application/${employerId}`)
    return data
}

export const applyShiftsRequest  = async (appliedShifts: TableShifts, employerId: string, forDate: string) => {
    const data = await fetchService.POST(`shift_application/${employerId}`, {appliedShifts, forDate})
    return data
}