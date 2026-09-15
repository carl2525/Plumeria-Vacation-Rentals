import React from 'react';

interface InlineLinkProps {
  to?: string;
  onClick?: () => void;
  onNavigate?: (path: string) => void;
  children: React.ReactNode;
  className?: string;
  title?: string;
}

/**
 * InlineLink integrates contextually into prose, sentences, and paragraphs.
 * Features Plumeria gold underlines, smooth hover states, and seamless internal navigation.
 */
export const InlineLink: React.FC<InlineLinkProps> = ({
  to,
  onClick,
  onNavigate,
  children,
  className = '',
  title,
}) => {
  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault();
      onClick();
      return;
    }
    if (to) {
      e.preventDefault();
      if (onNavigate) {
        onNavigate(to);
      } else if (typeof window !== 'undefined') {
        const target = to.startsWith('/') ? `#${to}` : to;
        window.location.hash = target;
      }
    }
  };

  const hrefTarget = to ? (to.startsWith('/') ? `#${to}` : to) : '#';

  return (
    <a
      href={hrefTarget}
      onClick={handleClick}
      title={title}
      className={`inline font-semibold text-[#1A3B34] underline decoration-[#C59B4B] decoration-1 underline-offset-[3px] hover:text-[#C59B4B] hover:decoration-2 transition-colors cursor-pointer ${className}`}
    >
      {children}
    </a>
  );
};
