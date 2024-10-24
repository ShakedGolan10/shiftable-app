'use client';
import React, { useEffect, useState } from 'react';
import { Select, SelectItem, Chip, SharedSelection } from '@nextui-org/react';
import { Shift } from '@/types/user/types.server';

interface ISetShiftsTableCellProps {
  day: string
  shiftIndex: number
  availableShifts: Shift[]
  onSelectChange: (updatedShifts: Shift[], shiftUnselected?: Shift) => Promise<boolean>
  selectedShifts?
}
export const SetShiftsTableCell = ({
  day,
  shiftIndex,
  availableShifts,
  onSelectChange,
  selectedShifts
}: ISetShiftsTableCellProps) => {
 
  useEffect(()=> {
    console.log({selectedShifts}, {availableShifts})
    if (!selectedShifts) return 
    setLocalSelectedShifts((prev) => {
      return [...Object.keys(selectedShifts).map((employeeName) => availableShifts.find((shift)=> shift.name === employeeName))]
    })

  },[selectedShifts])
  const [localSelectedShifts, setLocalSelectedShifts] = useState<Shift[]>([]);
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const handleSelect = async (keys: SharedSelection) => {
    const updatedShifts: Shift[] = [...keys].map((key) => JSON.parse(key as string))
    if (localSelectedShifts.length > updatedShifts.length) return // Disable the removel of selection using the select downdrop. 
    setIsSelectOpen(false)
    const isPossible = await onSelectChange(updatedShifts);
    if (isPossible) setLocalSelectedShifts(updatedShifts);
    else {}
  };

  const handleRemove = (value: Shift) => {
    const updatedShifts = localSelectedShifts.filter((shift) => ((shift.name !== value.name)));
    const isPossible = onSelectChange(updatedShifts, value);
    if (isPossible) setLocalSelectedShifts(updatedShifts,);
    else {}
  };

  return (
    <div className="flex flex-col items-center">
      <Select
        isOpen={isSelectOpen}
        onOpenChange={(open) => open !== isSelectOpen && setIsSelectOpen(open)}
        items={availableShifts}
        aria-label={`Select employee for ${day} shift ${shiftIndex + 1}`}
        placeholder={availableShifts[0].shiftId ? 'Select Employees' : 'No shifts'}
        renderValue={() => availableShifts[0].shiftId ? 'Select Employees' : 'No shifts'} 
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
                className='my-1 '
                style={{backgroundColor: (shiftObj?.isSelected) ? 'lightgreen' : (shiftObj?.isCant) ? 'red' : 'blueviolet'}}
                key={JSON.stringify(shiftObj)}
                textValue={shiftObj?.name} 
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
