import React from 'react';

type LoadingSpinnerProps = {
  fullScreen?: boolean;
  size?: 'small' | 'medium' | 'large';
};

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  fullScreen = false, 
  size = 'medium' 
}) => {
  const sizeClasses = {
    small: 'w-6 h-6 border-2',
    medium: 'w-10 h-10 border-3',
    large: 'w-16 h-16 border-4'
  };

  const spinner = (
    <div className={`${sizeClasses[size]} rounded-full border-solid border-gray-200 border-t-green-600 animate-spin`}></div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
        {spinner}
      </div>
    );
  }

  return <div className="flex justify-center py-4">{spinner}</div>;
};

export default LoadingSpinner;