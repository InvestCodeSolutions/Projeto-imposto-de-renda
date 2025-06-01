import React, { forwardRef } from 'react';

type InputProps = {
  label?: string;
  id: string;
  type?: string;
  placeholder?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'id' | 'className'>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      id,
      type = 'text',
      placeholder,
      error,
      helperText,
      fullWidth = true,
      required = false,
      disabled = false,
      className = '',
      icon,
      ...rest
    },
    ref
  ) => {
    const inputClasses = `
      block rounded-md border-gray-300 shadow-sm
      focus:border-green-500 focus:ring-green-500 sm:text-sm
      ${error ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500' : ''}
      ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}
      ${icon ? 'pl-10' : ''}
      ${fullWidth ? 'w-full' : ''}
    `;

    return (
      <div className={`${fullWidth ? 'w-full' : ''} ${className}`}>
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            type={type}
            id={id}
            name={id}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            className={inputClasses}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={`${id}-error ${id}-helper`}
            {...rest}
          />
        </div>
        {error && (
          <p className="mt-1 text-sm text-red-600" id={`${id}-error`}>
            {error}
          </p>
        )}
        {helperText && !error && (
          <p className="mt-1 text-sm text-gray-500" id={`${id}-helper`}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;