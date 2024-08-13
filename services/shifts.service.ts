import { fetchService } from "./fetch.service"

export interface TableShifts {
    sunday: Shift[]
    monday: Shift[]
    tuesday: Shift[]
    wednesday: Shift[]
    thursday: Shift[]
    friday: Shift[]
    saturday: Shift[]
}

export interface Shift {
  shift: string
  shiftId: string
  isSelected: boolean
  isCant: boolean
}

export interface RowItem {
  key: string 
  shifts: Shift[] 
}

export interface ShiftReqs {
    id: string
    shifts: TableShifts
}

export const getWeeklyWorkflow = async (employerId: string) => {
    const data = await fetchService.GET<{applicationRules: ApplicationRules, weeklyWorkflow: WeeklyWorkflow}>(`shift_application/${employerId}`)
    return data
}

export const applyShiftsRequest  = async (appliedShifts: TableShifts, employerId: string, forDate: string) => {
    const data = await fetchService.POST(`shift_application/${employerId}`, {appliedShifts, forDate})
    return data
}


export const createRows = <T>(items: any[], itemInCell: any): RowItem[] => {
    const maxRowsPerColumn = items.reduce((acc, element) => {
      return Math.max(acc, element.length);
    }, 0);
  
    const rows = [];
  
    for (let rowIndex = 0; rowIndex < maxRowsPerColumn; rowIndex++) {
      const rowItems: T[] = items.map(item => itemInCell || "");
      rows.push({
        key: rowIndex.toString(),
        rowItems
      });
    }
    return rows;
  };