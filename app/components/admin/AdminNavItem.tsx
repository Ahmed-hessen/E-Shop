import { IconType } from "react-icons";

interface AdminNavItemProps {
  // As we select the link it make black line under the link
  selected?: boolean;
  icon: IconType;
  label: string;
}

export default function AdminNavItem({
  selected,
  icon: Icon,
  label,
}: AdminNavItemProps) {
  return (
    <div
      className={`flex items-center justify-center gap-1
       p-2 border-b-2  text-center
        hover:text-slate-800
         transition cursor-pointer
          ${
            selected
              ? "border-b-slate-800 text-slate-800 "
              : " border-transparent text-slate-500"
          }`}
    >
      <Icon size={20} />
      <div className="font-medium text-sm text-center break-normal">
        {label}
      </div>
    </div>
  );
}
