import React from 'react';

interface CyberButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'cyan' | 'pink';
  isLoading?: boolean;
}

export const CyberButton: React.FC<CyberButtonProps> = ({ 
  children, 
  variant = 'cyan', 
  isLoading, 
  className = '',
  ...props 
}) => {
  const baseStyles = "relative px-8 py-3 font-bold uppercase tracking-widest transition-all duration-200 clip-path-polygon group";
  
  const variantStyles = variant === 'cyan' 
    ? "text-cyan-400 border border-cyan-500 hover:bg-cyan-500/10 hover:shadow-[0_0_20px_rgba(0,255,255,0.4)]"
    : "text-pink-500 border border-pink-500 hover:bg-pink-500/10 hover:shadow-[0_0_20px_rgba(255,0,255,0.4)]";

  return (
    <button 
      className={`${baseStyles} ${variantStyles} ${className} disabled:opacity-50 disabled:cursor-not-allowed`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      <span className={`absolute inset-0 w-full h-full border-t border-b ${variant === 'cyan' ? 'border-cyan-500' : 'border-pink-500'} scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}></span>
      
      {isLoading ? (
        <span className="flex items-center gap-2">
           <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
           </svg>
           ĐANG XỬ LÝ...
        </span>
      ) : (
        <>
          <span className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-current"></span>
          <span className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-current"></span>
          {children}
        </>
      )}
    </button>
  );
};