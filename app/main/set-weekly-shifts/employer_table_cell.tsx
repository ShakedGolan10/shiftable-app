'use client';
import React, { useEffect, useState } from 'react';
import { Select, SelectItem, Chip } from '@nextui-org/react';
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

  useEffect(() => {
    console.log('availableShifts', availableShifts);
  }, []);

  const handleSelect = ({ value }) => {
    const parsedValue = JSON.parse(value)
    const updatedShifts = [...localSelectedShifts, parsedValue];
    setLocalSelectedShifts(updatedShifts);
    onSelectChange(updatedShifts);
  };

  const handleRemove = (value: Shift) => {
    // const parsedValue = JSON.parse(value)
    const updatedShifts = localSelectedShifts.filter((shift) => ((shift.name !== value.name) && (shift.shiftId !== value.shiftId) && (shift.name !== value.name)));
    setLocalSelectedShifts(updatedShifts);
    onSelectChange(updatedShifts);
  };

  return (
    <div className="flex flex-col items-center">
      <Select
        aria-label={`Select employee for ${day} shift ${shiftIndex + 1}`}
        placeholder={availableShifts[0].shiftId ? availableShifts[0].shift : 'No shifts'}
        value=""
        label={availableShifts[0].shiftId ? availableShifts[0].shift : 'No shifts'}
        onChange={(ev) => handleSelect(ev.target)}
        className="w-full text-xs"
      >
        {availableShifts &&
          availableShifts
            // .filter((shiftObj) => !localSelectedShifts.includes(shiftObj?.shift))
            .map((shiftObj) => (
              shiftObj.shiftId && 
              <SelectItem
                className='my-1'
                style={{backgroundColor: (shiftObj?.isSelected) ? 'lightgreen' : (shiftObj?.isCant) ? 'red' : 'blueviolet'}}
                key={JSON.stringify(shiftObj)}
                value={JSON.stringify(shiftObj)}
                textValue={shiftObj?.shift} // Ensures accessibility with plain text
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
