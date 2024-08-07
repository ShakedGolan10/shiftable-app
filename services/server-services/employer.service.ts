import { Params } from "next/dist/shared/lib/router/utils/route-matcher"
import { queryMany } from "./db.service"
import { Employee } from "@/types/class.service"

export const getEmployees = async (filterBy: Params, employerId: string) => {
    filterBy = {...filterBy, employerId}
    const data = await queryMany<Employee>('users', filterBy)
    return data
}