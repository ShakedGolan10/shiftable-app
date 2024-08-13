'use client';
import React, { useEffect, useState } from 'react';
import { Select, SelectItem, Chip } from '@nextui-org/react';

interface EmployerTableCellProps {
  day: string;
  shiftIndex: number;
  availableShifts: { isSelected: boolean; shift: string; isCant: boolean; shiftId: string }[];
  selectedShifts: string[];
  onSelectChange: (updatedShifts: string[]) => void;
}

export const EmployerTableCell: React.FC<EmployerTableCellProps> = ({
  day,
  shiftIndex,
  availableShifts,
  selectedShifts,
  onSelectChange,
}) => {
  const [localSelectedShifts, setLocalSelectedShifts] = useState<string[]>(selectedShifts);

  useEffect(() => {
    console.log('day', day);
    console.log('shiftIndex', shiftIndex);
    console.log('availableShifts', availableShifts);
    console.log('selectedShifts', selectedShifts);
  }, []);

  const handleSelect = ({ value }) => {
    const updatedShifts = [...localSelectedShifts, value];
    setLocalSelectedShifts(updatedShifts);
    onSelectChange(updatedShifts);
  };

  const handleRemove = (value: string) => {
    const updatedShifts = localSelectedShifts.filter((shift) => shift !== value);
    setLocalSelectedShifts(updatedShifts);
    onSelectChange(updatedShifts);
  };

  return (
    <div className="flex flex-col items-center">
      <Select
        aria-label={`Select employee for ${day} shift ${shiftIndex + 1}`}
        placeholder="Select Employee"
        value=""
        onChange={(ev) => handleSelect(ev.target)}
        className="w-full text-xs"
      >
        {availableShifts &&
          availableShifts
            .filter((shiftObj) => !localSelectedShifts.includes(shiftObj.shift))
            .map((shiftObj) => (
              <SelectItem
                key={shiftObj.shiftId}
                value={shiftObj.shift}
                textValue={shiftObj.shift} // Ensures accessibility with plain text
              >
                {shiftObj.shift}
              </SelectItem>
            ))}
      </Select>
      <div className="mt-2 flex flex-wrap gap-1">
        {localSelectedShifts.map((shift) => (
          <Chip key={shift} onClose={() => handleRemove(shift)} className="text-xs">
            {shift}
          </Chip>
        ))}
      </div>
    </div>
  );
};
