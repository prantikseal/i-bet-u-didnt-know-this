import React, { ReactNode } from "react";

interface ButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const Button = ({ children, className = "", ...rest }: ButtonProps) => {
  return (
    <div className="relative inline-block">
      {/* Interactive back layer */}
      <div
        {...rest}
        role="button"
        className={`relative z-0 cursor-pointer select-none rounded-md px-4 py-2 text-black transition-[filter] duration-150 hover:brightness-105 active:brightness-95 disabled:opacity-50 disabled:cursor-not-allowed font-anak-paud border-2 border-black ${className}`}
        style={{
          background: "linear-gradient(180deg, #FFE44A 0%, #FFBB00 73.63%)",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Button;
