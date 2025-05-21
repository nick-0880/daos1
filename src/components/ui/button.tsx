import React, { ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

// Add buttonVariants function to be used by other components
export const buttonVariants = ({ variant = 'primary', size = 'md' }: { variant?: ButtonVariant; size?: ButtonSize } = {}) => {
  // Base styles
  const baseStyles = 'inline-flex items-center justify-center font-bold rounded-md transition-all';
  
  // Variant styles
  const variantStyles = {
    primary: 'bg-purple-600 text-white hover:bg-purple-700',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700',
    outline: 'bg-transparent border border-purple-600 text-purple-600 hover:bg-purple-50',
    ghost: 'bg-transparent text-purple-600 hover:bg-purple-50',
    link: 'bg-transparent text-purple-600 underline hover:text-purple-700',
  };
  
  // Size styles
  const sizeStyles = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };
  
  return `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]}`;
};

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  leftIcon,
  rightIcon,
  disabled,
  className = '',
  ...props
}) => {
  // Base styles
  const baseStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    borderRadius: '0.5rem',
    transition: 'all 0.2s ease',
    cursor: disabled || isLoading ? 'not-allowed' : 'pointer',
    opacity: disabled || isLoading ? 0.7 : 1,
    border: 'none',
    width: fullWidth ? '100%' : 'auto',
  };

  // Variant styles
  const variantStyles = {
    primary: {
      backgroundColor: '#8B5CF6',
      color: 'white',
    },
    secondary: {
      backgroundColor: '#4B5563',
      color: 'white',
    },
    outline: {
      backgroundColor: 'transparent',
      color: '#8B5CF6',
      border: '1px solid #8B5CF6',
    },
    ghost: {
      backgroundColor: 'transparent',
      color: '#8B5CF6',
    },
    link: {
      backgroundColor: 'transparent',
      color: '#8B5CF6',
      textDecoration: 'underline',
    },
  };

  // Size styles
  const sizeStyles = {
    sm: {
      padding: '0.25rem 0.5rem',
      fontSize: '0.875rem',
      minWidth: '100px',
    },
    md: {
      padding: '0.5rem 1rem',
      fontSize: '1rem',
      minWidth: '140px',
    },
    lg: {
      padding: '0.75rem 1.5rem',
      fontSize: '1.125rem',
      minWidth: '160px',
    },
  };

  // Combine styles
  const combinedStyles = {
    ...baseStyles,
    ...variantStyles[variant],
    ...sizeStyles[size],
  };

  return (
    <button
      style={combinedStyles}
      disabled={disabled || isLoading}
      {...props}
    >
      {leftIcon && <span style={{ marginRight: '0.5rem' }}>{leftIcon}</span>}
      {isLoading ? 'Loading...' : children}
      {rightIcon && <span style={{ marginLeft: '0.5rem' }}>{rightIcon}</span>}
    </button>
  );
};

export default Button;
