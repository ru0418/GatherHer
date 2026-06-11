import React from "react";

interface LogoProps {
  className?: string;
  size?: number | string;
}

/**
 * GatherHer Logo Icon Component
 * Incorporates the two back-to-back female mountain silhouettes in vector format
 */
export const GatherHerLogoIcon: React.FC<LogoProps> = ({ className = "", size = 24 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block ${className}`}
    >
      {/* Background/Backing Mountain Silhouette (Green - Left side & peak) */}
      <path
        d="M10 85C25 80 35 73 42 63C47 56 46 47 45 40C43 31 43.5 25 47 21C49 18.5 52.5 17 55 18M55 18C56.5 19 57.5 21 57.5 23C56.5 25 55 26.5 52 28.5C49 30.5 45.5 39.5 40.5 49C35.5 58.5 28 66 10 85Z"
        fill="currentColor"
        className="text-[#1D3B23]" // Real-life GatherHer deep green
      />

      {/* Left Silhouette Ponytail */}
      <path
        d="M56 26C58.5 26 62.5 29 61.5 34C60.5 39 56 42 55.5 47C55 42 56 37 56.5 34"
        fill="currentColor"
        className="text-[#1D3B23]"
      />

      {/* Foreground Mountain Peak (Green - Left lower ridge & center peak) */}
      <path
        d="M26 82L62.5 41.5L88 64"
        stroke="currentColor"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-[#1D3B23]"
      />
      <path
        d="M33 80C42 74 48 67 52.5 60L62.5 44L75 62"
        fill="currentColor"
        className="text-[#1D3B23]"
      />

      {/* Right Mountain Silhouette (Terracotta Orange - Right side & peak) */}
      <path
        d="M110 85C95 80 87 73 80.5 63C75.5 56 75.5 47.5 76 40C76.5 32 75 27 70.5 23.5C68.5 21.5 65.5 20 63 21.5M63 21.5C61.5 22.5 61 24.5 61.5 26.5C62.5 28.5 63.5 29.5 66.5 31.2C69.5 32.8 71.5 40 75 49C78.5 58 87 67.5 110 85Z"
        fill="currentColor"
        className="text-[#D37B5C]" // Real-life GatherHer terracotta
      />

      {/* Right Silhouette Hair Bun */}
      <path
        d="M60.5 25C59 25 58.5 21.5 60.5 20C62.5 18.5 64.5 20 63.5 23Z"
        fill="currentColor"
        className="text-[#D37B5C]"
      />
    </svg>
  );
};

interface FullLogoProps extends LogoProps {
  textColorClass?: string;
  showSubtitle?: boolean;
}

/**
 * GatherHer Full Horizontal Logo (Visual mark + brand name with custom heart counter 'a')
 */
export const GatherHerLogoFull: React.FC<FullLogoProps> = ({
  className = "",
  size = "50",
  textColorClass = "text-bento-charcoal",
  showSubtitle = true,
}) => {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Custom Vector Icon Marks */}
      <div className="shrink-0 flex items-center justify-center p-2 bg-bento-limelight rounded-2xl border border-bento-sage/15 shadow-xxs">
        <GatherHerLogoIcon size={size} />
      </div>

      {/* Brand Text Block */}
      <div className="flex flex-col justify-center">
        <div className="flex items-center text-2xl font-black font-sans tracking-tight leading-none">
          {/* "Gather" in dark forest green */}
          <span className="text-[#1D3B23] tracking-normal flex items-center">
            G
            {/* The letter 'a' with custom pinkish red heart inside */}
            <span className="relative inline-block mx-[0.5px]">
              a
              <span className="absolute left-[3px] top-[10px] w-[5.5px] h-[5px] flex items-center justify-center text-[#E05A47]">
                <svg viewBox="0 0 10 10" fill="currentColor">
                  <path d="M5 2.1C4.4 0.9 2.8 0.5 1.7 1.4C0.5 2.3 0.3 3.9 1.2 5C2 6 4.3 8.3 4.7 8.7C4.8 8.9 5.2 8.9 5.3 8.7C5.7 8.3 8 6 8.8 5C9.7 3.9 9.5 2.3 8.3 1.4C7.2 0.5 5.6 0.9 5 2.1Z" />
                </svg>
              </span>
            </span>
            ther
          </span>

          {/* "Her" in warm peach/terracotta */}
          <span className="text-[#D37B5C] font-black tracking-normal ml-[1px]">Her</span>
        </div>

        {/* Dynamic Optional Subtitle */}
        {showSubtitle && (
          <span className="text-[10px] text-bento-forest font-bold tracking-widest uppercase mt-1 leading-none">
            女性專屬 · 戶外生活社群
          </span>
        )}
      </div>
    </div>
  );
};
