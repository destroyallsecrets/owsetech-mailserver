import React from "react";

type RetroWindowProps = {
  title: string;
  children: React.ReactNode;
};

export function RetroWindow({ title, children }: RetroWindowProps) {
  return (
    <div className="bg-[#e5e3db] p-2 min-h-screen flex items-center justify-center">
      <div className="relative w-[700px] min-h-[400px] shadow-[4px_4px_0_#b0b0b0] border-[3px] border-[#b0b0b0] rounded-[4px]" style={{ boxShadow: '4px 4px 0 #b0b0b0, 0 1px 0 0 #fff inset' }}>
        {/* Title Bar */}
        <div className="flex items-center justify-between h-10 px-3 bg-[#3a6ea5] border-b-2 border-[#b0b0b0] rounded-t-[2px]">
          <span className="text-white font-bold text-lg tracking-wide select-none">{title}</span>
          <div className="flex gap-1">
            <button className="w-6 h-6 bg-[#e5e3db] border border-[#b0b0b0] flex items-center justify-center text-xs font-bold ml-1">-</button>
            <button className="w-6 h-6 bg-[#e5e3db] border border-[#b0b0b0] flex items-center justify-center text-xs font-bold ml-1">▢</button>
            <button className="w-6 h-6 bg-[#e5e3db] border border-[#b0b0b0] flex items-center justify-center text-xs font-bold ml-1">×</button>
          </div>
        </div>
        {/* Content */}
        <div className="p-0 bg-[#e5e3db]">{children}</div>
      </div>
    </div>
  );
}
