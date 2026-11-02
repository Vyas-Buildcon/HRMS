import React from 'react';

export interface VetanLogoProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'image' | 'full' | 'icon' | 'horizontal';
  showSubtitle?: boolean;
  subtitleText?: string;
  theme?: 'light' | 'dark' | 'auto';
}

export const VetanLogo: React.FC<VetanLogoProps> = ({
  className = '',
  size = 'md',
  variant = 'full',
  showSubtitle = false,
  subtitleText = '',
  theme = 'auto',
}) => {
  const dimensions = {
    xs: { imgH: 26, iconBox: 28, text: 'text-xs', sub: 'text-[9px]' },
    sm: { imgH: 34, iconBox: 38, text: 'text-sm font-black', sub: 'text-[10px]' },
    md: { imgH: 48, iconBox: 52, text: 'text-lg font-black', sub: 'text-xs' },
    lg: { imgH: 72, iconBox: 76, text: 'text-2xl font-black', sub: 'text-xs' },
    xl: { imgH: 96, iconBox: 100, text: 'text-3xl font-black', sub: 'text-sm' },
  };

  const dim = dimensions[size] || dimensions.md;
  const isDark = theme === 'dark';
  const markClass = `inline-flex shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#039583] to-[#023b77] font-black text-white shadow-sm ${dim.text}`;

  if (variant === 'icon') {
    return (
      <div
        className={`inline-flex items-center justify-center rounded-xl bg-white/95 border border-slate-200/80 shadow-xs p-1.5 transition-transform duration-200 hover:scale-105 ${className}`}
        style={{ width: dim.iconBox, height: dim.iconBox }}
        title="Vyas"
      >
        <span aria-label="Vyas" className={`${markClass} h-full w-full`}>V</span>
      </div>
    );
  }

  if (variant === 'image') {
    return (
      <span className={`inline-flex items-center font-black tracking-tight text-[#023b77] ${dim.text} ${className}`}>
        Vyas
      </span>
    );
  }

  if (variant === 'horizontal') {
    return (
      <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
        <span
          aria-hidden="true"
          className={markClass}
          style={{ width: dim.iconBox, height: dim.iconBox }}
        >
          V
        </span>
        <div className="flex flex-col leading-tight">
          <span
            className={`font-black tracking-tight ${dim.text} ${
              isDark ? 'text-white' : 'text-[#023b77]'
            }`}
          >
            Vyas
          </span>
          {showSubtitle && subtitleText && (
            <span
              className={`font-semibold tracking-wider uppercase ${dim.sub} ${
                isDark ? 'text-slate-300' : 'text-slate-500'
              }`}
            >
              {subtitleText}
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`inline-flex flex-col items-center justify-center gap-1.5 ${className}`}>
      <div className="flex items-center gap-2">
        <span aria-hidden="true" className={markClass} style={{ width: dim.iconBox, height: dim.iconBox }}>
          V
        </span>
        <span className={`font-black tracking-tight ${isDark ? 'text-white' : 'text-[#023b77]'} ${dim.text}`}>
          Vyas
        </span>
      </div>
      {showSubtitle && subtitleText && (
        <span className="text-[11px] font-bold tracking-widest text-[#039583] uppercase mt-0.5">
          {subtitleText}
        </span>
      )}
    </div>
  );
};

export const AnusyutiLogo = VetanLogo;
export const SahakarLogo = VetanLogo;
