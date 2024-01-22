"use client";
import { IconType } from "react-icons";

interface CategoryInputProps {
  selected?: boolean;
  label: string;
  icon: IconType;
  // when i click on category agive me only the category i choose
  onClick: (value: string) => void;
}

export default function CategoryInput({
  selected,
  label,
  icon: Icon,
  onClick,
}: CategoryInputProps) {
  return (
    <div
      className={`rounded-xl border-2
       flex flex-col items-center gap-2
       hover:border-slate-500 p-3
        transition cursor-pointer ${
          selected ? "border-slate-500" : "border-slate-200 "
        }`}
      onClick={() => onClick(label)}
    >
      <Icon size={20} />
      <div className="font-medium">{label}</div>
    </div>
  );
}
