'use client';
import React, { useEffect, useState } from 'react';
import { Select, SelectItem, Chip, SharedSelection } from '@nextui-org/react';
import { Shift } from '@/services/shifts.service';

interface EmployerTableCellProps {
  day: string;
  shiftIndex: number;
  availableShifts: { isSelected: boolean; shift: string; isCant: boolean; shiftId: string, name: string }[];
  selectedShifts: Shift[];
  onSelectChange: (updatedShifts: Shift[]) => void;
}

export const EmployerTableCell: React.FC<EmployerTableCellProps> = ({
  day,
  shiftIndex,
  availableShifts,
  selectedShifts,
  onSelectChange,
}) => {
  const [localSelectedShifts, setLocalSelectedShifts] = useState<Shift[]>(selectedShifts);

  const handleSelect = (keys: SharedSelection) => {
    const selectedArray: Shift[] = [...keys].map((key) => JSON.parse(key as string))
    setLocalSelectedShifts(selectedArray);
    onSelectChange(selectedArray);
  };

  const handleRemove = (value: Shift) => {
    const updatedShifts = localSelectedShifts.filter((shift) => ((value.name !== shift.name)));
    setLocalSelectedShifts(updatedShifts);
    onSelectChange(updatedShifts);
  };

  const filteredAvailableShifts = availableShifts.filter(
    (shiftObj) => !localSelectedShifts.some((selectedShift) => selectedShift.shiftId === shiftObj.shiftId)
  );

  return (
    <div className="flex flex-col items-center">
      <Select
        aria-label={`Select employee for ${day} shift ${shiftIndex + 1}`}
        placeholder={availableShifts[0].shiftId ? 'Select Employees' : 'No shifts'}
        renderValue={() => availableShifts[0].shiftId ? 'Select Employees' : 'No shifts'} // Prevents displaying selected values in the text area
        selectionMode="multiple"
        label={availableShifts[0].shiftId ? availableShifts[0].shift : 'No shifts'}
        onSelectionChange={handleSelect}
        className="w-full text-xs"
        >
        {availableShifts &&
          availableShifts
            .filter((shiftObj, idx) => shiftObj.name !== localSelectedShifts[idx]?.name)
            .map((shiftObj) => (
              shiftObj.shiftId && 
              <SelectItem
                className='my-1'
                style={{backgroundColor: (shiftObj?.isSelected) ? 'lightgreen' : (shiftObj?.isCant) ? 'red' : 'blueviolet'}}
                key={JSON.stringify(shiftObj)}
                value={JSON.stringify(shiftObj)}
                textValue={shiftObj?.name} // Ensures accessibility with plain text
                // onClick={() => handleSelect(shiftObj)}
              >
                {shiftObj.name}
              </SelectItem>
            ))}
      </Select>
      <div className="mt-2 flex flex-wrap gap-1">
        {localSelectedShifts.map((shift) => (
          <Chip key={shift?.name} style={{backgroundColor: (shift?.isSelected) ? 'lightgreen' : (shift?.isCant) ? 'red' : 'blueviolet'}} onClose={() => handleRemove(shift)} className="text-xs">
            {shift?.name}
          </Chip>
        ))}
      </div>
    </div>
  );
};
