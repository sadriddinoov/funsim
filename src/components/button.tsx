"use client";

import { useRouter } from "next/navigation";

type ButtonVariant = "usual" | "orange" | "gray";

interface ButtonProps {
  title: string;
  navigate?: string;
  bg?: ButtonVariant;
  color?: ButtonVariant;
  classname?: string;
  disabled?: boolean;
  none?: boolean;
  onclick?: (e: any) => void;
}

const variantClasses: Record<ButtonVariant, string> = {
  usual: "bg-[#F06F1E] text-white",
  orange: "bg-[#F06F1E1A] text-[#F06F1E]",
  gray: "bg-[#5959591A] text-[#595959]",
};

export default function Button({
  title,
  navigate,
  bg = "usual",
  classname,
  none = false,
  disabled = false,
  onclick,
}: ButtonProps) {
  const nav = useRouter();

  const handleClick = () => {
    if (disabled) {
      return;
    }
    if (none) {
      return;
    }
    if (navigate) {
      nav.push(navigate);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`p-2 rounded-[12px] font-medium transition-colors duration-200 w-full ${
        variantClasses[bg]
      } ${classname} text-[14px] md:text-base lg:text-[16px] ${
        disabled
          ? "opacity-50 cursor-not-allowed"
          : "hover:opacity-90 active:opacity-80"
      } ${
        none
          ? "hidden"
          : ""
      } focus:outline-none focus:ring-2 focus:ring-${
        bg === "usual" ? "orange" : bg
      }-500`}
      disabled={disabled}
    >
      <p onClick={onclick}>{title}</p>
    </button>
  );
}
