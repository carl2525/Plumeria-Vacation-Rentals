import React from 'react';
import { PlumeriaSymbolLogo } from './PlumeriaSymbolLogo';

interface LogoWatermarkProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'center' | 'custom';
  opacity?: string;
  variant?: 'light' | 'dark' | 'white';
}

export const LogoWatermark: React.FC<LogoWatermarkProps> = ({
  className = '',
  size = 'lg',
  position = 'top-right',
  opacity = 'opacity-[0.04] sm:opacity-[0.07]',
  variant = 'dark',
}) => {
  const sizeClasses = {
    sm: 'w-48 h-48',
    md: 'w-72 h-72',
    lg: 'w-96 h-96',
    xl: 'w-[420px] h-[420px]',
    '2xl': 'w-[560px] h-[560px]',
  }[size];

  const positionClasses = {
    'top-right': 'absolute -top-12 -right-16 sm:-top-16 sm:-right-20',
    'top-left': 'absolute -top-12 -left-16 sm:-top-16 sm:-left-20',
    'bottom-right': 'absolute -bottom-16 -right-16 sm:-bottom-20 sm:-right-20',
    'bottom-left': 'absolute -bottom-16 -left-16 sm:-bottom-20 sm:-left-20',
    center: 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
    custom: '',
  }[position];

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none z-0 overflow-hidden ${positionClasses} ${sizeClasses} ${opacity} ${className}`}
    >
      <PlumeriaSymbolLogo variant={variant} className="w-full h-full" />
    </div>
  );
};
