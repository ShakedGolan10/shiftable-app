
import { fetchServiceServer } from "./fetch.service.server"

const getUserApplicableShifts = async () => {
    // await fetchServiceServer.GET<Shifts>('applicable_shifts')
    // await fetch('http://localhost:3000/api/applicable_shifts', {method: 'GET'})
    // path for shifts - /users/<employerID>/applicable_shifts/<employeeId>
}



export const shiftService = {
    getUserApplicableShifts
}