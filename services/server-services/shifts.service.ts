import { fetchService } from "../fetch.service"

const getUserApplicableShifts = async () => {
    fetchService.GET<Shifts>('applicable_shifts')
    // path for shifts - /users/<employerID>/applicable_shifts/<employeeId>
}



export const shiftService = {
    getUserApplicableShifts
}