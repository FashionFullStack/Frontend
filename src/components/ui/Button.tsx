import type { ButtonHTMLAttributes, ElementType, ComponentPropsWithoutRef } from 'react';

type ButtonBaseProps = {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
};

type ButtonAsComponent<C extends ElementType> = ButtonBaseProps & {
  as?: C;
} & ComponentPropsWithoutRef<C>;

type ButtonProps<C extends ElementType = 'button'> = ButtonAsComponent<C>;

export const Button = <C extends ElementType = 'button'>({
  variant = 'primary',
  size = 'md',
  children,
  fullWidth = false,
  className = '',
  as,
  ...props
}: ButtonProps<C>) => {
  const Component = as || 'button';
  
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors';
  
  const variants = {
    primary: 'text-white bg-primary-600 hover:bg-primary-700 focus:ring-primary-500',
    secondary: 'text-gray-700 bg-gray-100 hover:bg-gray-200 focus:ring-gray-500',
    outline: 'text-gray-700 bg-transparent border-2 border-gray-300 hover:bg-gray-50 focus:ring-gray-500',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  const classes = [
    baseStyles,
    variants[variant],
    sizes[size],
    fullWidth ? 'w-full' : '',
    className,
  ].join(' ');

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
};

export default Button; 