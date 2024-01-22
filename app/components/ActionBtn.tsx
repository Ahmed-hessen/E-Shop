import { IconType } from "react-icons";

interface ActionBtnProps {
  icon: IconType;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}
export default function ActionBtn({
  icon: Icon,
  onClick,
  disabled,
}: ActionBtnProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
    flex items-center justify-center rounded-sm cursor-pointer w-[35px] h-[25px] text-slate-700 border border-slate-400 ${
      disabled && "opacity-50 cursor-not-allowed"
    }`}
    >
      <Icon size={15} />
    </button>
  );
}
