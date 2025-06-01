import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';
import Card from '../common/Card';

type AlertCardProps = {
  title: string;
  message: string;
  actionText?: string;
  actionLink?: string;
  variant?: 'warning' | 'danger' | 'info' | 'success';
};

const AlertCard: React.FC<AlertCardProps> = ({
  title,
  message,
  actionText,
  actionLink,
  variant = 'warning',
}) => {
  const variantStyles = {
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      icon: 'text-yellow-500',
      title: 'text-yellow-800',
      text: 'text-yellow-700',
      action: 'text-yellow-600 hover:text-yellow-800',
    },
    danger: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      icon: 'text-red-500',
      title: 'text-red-800',
      text: 'text-red-700',
      action: 'text-red-600 hover:text-red-800',
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      icon: 'text-blue-500',
      title: 'text-blue-800',
      text: 'text-blue-700',
      action: 'text-blue-600 hover:text-blue-800',
    },
    success: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      icon: 'text-green-500',
      title: 'text-green-800',
      text: 'text-green-700',
      action: 'text-green-600 hover:text-green-800',
    },
  };

  const styles = variantStyles[variant];

  return (
    <Card className={`${styles.bg} border ${styles.border}`}>
      <div className="flex">
        <div className="flex-shrink-0">
          <AlertTriangle className={`h-5 w-5 ${styles.icon}`} />
        </div>
        <div className="ml-3">
          <h3 className={`text-sm font-medium ${styles.title}`}>{title}</h3>
          <div className={`mt-2 text-sm ${styles.text}`}>
            <p>{message}</p>
          </div>
          {actionText && actionLink && (
            <div className="mt-4">
              <div className="-mx-2 -my-1.5 flex">
                <Link
                  to={actionLink}
                  className={`rounded-md px-2 py-1.5 text-sm font-medium ${styles.action}`}
                >
                  {actionText}
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default AlertCard;