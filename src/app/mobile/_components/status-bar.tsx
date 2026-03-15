/** Simulated iOS status bar — time left, signal/battery right */
export function StatusBar() {
  return (
    <div className="relative z-20 flex items-center justify-between px-7 pt-3 pb-1 shrink-0">
      <span className="font-mono text-[13px] font-semibold text-foreground tracking-tight">
        9:41
      </span>
      <div className="flex items-center gap-1.5">
        {/* Signal bars */}
        <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
          <rect x="0" y="7" width="3" height="5" rx="0.5" fill="currentColor" className="text-foreground" />
          <rect x="4.5" y="5" width="3" height="7" rx="0.5" fill="currentColor" className="text-foreground" />
          <rect x="9" y="2.5" width="3" height="9.5" rx="0.5" fill="currentColor" className="text-foreground" />
          <rect x="13.5" y="0" width="3" height="12" rx="0.5" fill="currentColor" className="text-foreground" />
        </svg>
        {/* Wifi */}
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <path d="M8 9.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3z" fill="currentColor" className="text-foreground" />
          <path d="M3.5 6.5a6.5 6.5 0 019 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="butt" className="text-foreground" />
          <path d="M1 4A10 10 0 0115 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="butt" className="text-foreground" />
        </svg>
        {/* Battery */}
        <div className="flex items-center gap-0.5">
          <div className="relative w-[22px] h-[11px] border border-foreground rounded-[2px] flex items-center px-0.5">
            <div className="w-full h-[7px] bg-foreground rounded-[1px]" />
          </div>
          <div className="w-[2px] h-[5px] bg-foreground/60 rounded-r-[1px]" />
        </div>
      </div>
    </div>
  );
}
