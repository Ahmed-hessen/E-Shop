"use client";

import { FieldValues, UseFormRegister } from "react-hook-form";

interface CustomCheckBoxProps {
  id: string;
  label: string;
  disabled?: boolean;
  register: UseFormRegister<FieldValues>;
}
export default function CustomCheckBox({
  id,
  label,
  disabled,
  register,
}: CustomCheckBoxProps) {
  return (
    <div className="w-full flex flex-row items-center gap-1">
      <input
        id={id}
        disabled={disabled}
        {...register(id)}
        placeholder=""
        type="checkbox"
        className="cursor-pointer w-4 h-4"
      />

      <label htmlFor={id} className="font-lg cursor-pointer">
        {label}
      </label>
    </div>
  );
}
