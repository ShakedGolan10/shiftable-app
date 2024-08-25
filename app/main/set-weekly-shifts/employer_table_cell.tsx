'use client';
import React, { useEffect, useState } from 'react';
import { Select, SelectItem, Chip, SharedSelection } from '@nextui-org/react';
import { Shift } from '@/services/shifts.service';

interface EmployerTableCellProps {
  day: string;
  shiftIndex: number;
  availableShifts: { isSelected: boolean; shift: string; isCant: boolean; shiftId: string, name: string }[];
  onSelectChange: (updatedShifts: Shift[]) => void;
}

export const EmployerTableCell: React.FC<EmployerTableCellProps> = ({
  day,
  shiftIndex,
  availableShifts,
  onSelectChange,
}) => {

  useEffect(()=> {
    console.log({availableShifts})
  },[])
 
  const [localSelectedShifts, setLocalSelectedShifts] = useState<Shift[]>([]);
  
  const handleSelect = (keys: SharedSelection) => {
  const selectedArray: Shift[] = [...keys].map((key) => JSON.parse(key as string))
  setLocalSelectedShifts(selectedArray);
  onSelectChange(selectedArray);
  };

  const handleRemove = (value: Shift) => {
    const updatedShifts = localSelectedShifts.filter((shift) => ((shift.name !== value.name)));
    setLocalSelectedShifts(updatedShifts);
    onSelectChange(updatedShifts);
  };

  return (
    <div className="flex flex-col items-center">
      <Select
        items={availableShifts}
        aria-label={`Select employee for ${day} shift ${shiftIndex + 1}`}
        placeholder={availableShifts[0].shiftId ? 'Select Employees' : 'No shifts'}
        renderValue={() => availableShifts[0].shiftId ? 'Select Employees' : 'No shifts'} // Prevents displaying selected values in the text area
        selectionMode="multiple"
        label={availableShifts[0].shiftId ? availableShifts[0].shift : 'No shifts'}
        onSelectionChange={(keys) => handleSelect(keys)}
        selectedKeys={[...localSelectedShifts].map((shift) => JSON.stringify(shift))}
        className="w-full text-xs"
        aria-hidden='false'
        >
        {(shiftObj) => (
              shiftObj.shiftId && 
              <SelectItem
              selectedIcon
                className='my-1'
                style={{backgroundColor: (shiftObj?.isSelected) ? 'lightgreen' : (shiftObj?.isCant) ? 'red' : 'blueviolet'}}
                key={JSON.stringify(shiftObj)}
                textValue={shiftObj?.name} // Ensures accessibility with plain text
              >
                {shiftObj.name}
              </SelectItem>
            )}
      </Select>
      <div className="mt-2 flex flex-wrap gap-4">
        {localSelectedShifts.map((shift) => (
          <Chip size="sm" key={shift?.name} style={{backgroundColor: (shift?.isSelected) ? 'lightgreen' : (shift?.isCant) ? 'red' : 'blueviolet'}} onClose={() => handleRemove(shift)} className="text-tiny h-fit w-fit">
            {shift?.name}
          </Chip>
        ))}
      </div>
    </div>
  );
};
