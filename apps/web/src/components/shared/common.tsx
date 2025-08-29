import React from 'react';

export const Avatar: React.FC<{ size?: 'sm' | 'md' | 'lg', className?: string }> = ({ size = 'md', className = '' }) => {
    const sizeClasses = {
        sm: 'w-9 h-9',
        md: 'w-12 h-12',
        lg: 'w-16 h-16',
    };
    return (
        <div 
            className={`rounded-full bg-center bg-no-repeat bg-[#233045] border border-border-color flex-shrink-0 ${sizeClasses[size]} ${className}`}
            style={{ backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="90" height="90" viewBox="0 0 24 24" fill="%23cbd5e1"><path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zm0 2c-3.86 0-7 3.141-7 7h14c0-3.859-3.14-7-7-7z"/></svg>')`, backgroundSize: '60%' }}
        />
    );
};

export const Chip: React.FC<{ children: React.ReactNode, onClick?: () => void, className?: string }> = ({ children, onClick, className }) => (
    <div 
        className={`bg-chip text-chip-text border border-border-color py-1 px-2.5 rounded-full text-xs whitespace-nowrap cursor-pointer hover:bg-[#262c38] ${className}`}
        onClick={onClick}
    >
        {children}
    </div>
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'secondary', className = '', ...props }) => {
    const baseClasses = 'px-4 py-2 rounded-[10px] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed transition-colors text-sm font-semibold';
    const variantClasses = {
        primary: 'bg-brand border border-brand text-white hover:bg-brand-hover',
        secondary: 'bg-[#1a2130] border border-border-color text-text-primary hover:bg-[#222b3f]',
        ghost: 'bg-transparent border border-transparent hover:bg-[#1a2130]',
    };
    return <button className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...props}>{children}</button>;
};

export const Panel: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className = '' }) => (
    <div className={`bg-panel border border-border-color rounded-xl shadow-custom ${className}`}>
        {children}
    </div>
);
