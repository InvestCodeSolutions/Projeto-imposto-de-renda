import React from 'react';

type LogoProps = {
  className?: string;
};

const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <svg 
        width="32" 
        height="32" 
        viewBox="0 0 32 32" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="mr-2"
      >
        <rect width="32" height="32" rx="8" fill="#008000" />
        <path 
          d="M9 16.5L13 20.5L23 10.5" 
          stroke="white" 
          strokeWidth="3" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg>
      <span className="text-xl font-bold text-gray-900">
        Declara<span className="text-green-600">Já</span>
      </span>
    </div>
  );
};

export default Logo;