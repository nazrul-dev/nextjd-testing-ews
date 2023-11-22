import React, { ChangeEvent } from 'react';

interface RadioProps {
  label: string;
  name: string;
  value: string;
  checked: boolean;
  onChange: (value: any) => void; 
}

const Radio = ({ label, name, value, checked, onChange }:RadioProps) => {
  return (
    
    <div className="flex items-center border p-2 rounded-lg">
      <input
        type="radio"
        id={value}
        name={name}
        value={value}
        checked={checked}
        onChange={(e) => onChange(e.target.value)}
        className="form-radio h-3 w-3 text-indigo-800 transition duration-150 ease-in-out"
      />
      <label htmlFor={value} className="ml-2 text-gray-700">
        {label}
      </label>
    </div>
  );
};

export default Radio;
