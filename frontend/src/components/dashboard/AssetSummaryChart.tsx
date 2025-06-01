import React from 'react';

// This is a placeholder component for the asset summary chart
// In a real application, you would use a chart library like Chart.js or Recharts
const AssetSummaryChart: React.FC = () => {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="text-center">
        <div className="mb-4">
          <svg
            width="240"
            height="240"
            viewBox="0 0 240 240"
            className="mx-auto"
          >
            <circle
              cx="120"
              cy="120"
              r="90"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="30"
            />
            <circle
              cx="120"
              cy="120"
              r="90"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="30"
              strokeDasharray="565.2"
              strokeDashoffset="135.7"
              transform="rotate(-90 120 120)"
            />
            <circle
              cx="120"
              cy="120"
              r="90"
              fill="none"
              stroke="#10b981"
              strokeWidth="30"
              strokeDasharray="565.2"
              strokeDashoffset="480.4"
              transform="rotate(-90 120 120)"
              strokeLinecap="round"
            />
            <circle
              cx="120"
              cy="120"
              r="90"
              fill="none"
              stroke="#8b5cf6"
              strokeWidth="30"
              strokeDasharray="565.2"
              strokeDashoffset="396.0"
              transform="rotate(127 120 120)"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="w-4 h-4 bg-blue-500 rounded-full mx-auto"></div>
            <p className="text-sm text-gray-600 mt-1">Imóveis</p>
            <p className="font-semibold">65%</p>
          </div>
          <div>
            <div className="w-4 h-4 bg-purple-500 rounded-full mx-auto"></div>
            <p className="text-sm text-gray-600 mt-1">Investimentos</p>
            <p className="font-semibold">22%</p>
          </div>
          <div>
            <div className="w-4 h-4 bg-green-500 rounded-full mx-auto"></div>
            <p className="text-sm text-gray-600 mt-1">Veículos</p>
            <p className="font-semibold">13%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetSummaryChart;