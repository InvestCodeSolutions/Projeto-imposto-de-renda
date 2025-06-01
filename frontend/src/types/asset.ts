export type AssetType = 'property' | 'vehicle' | 'investment' | 'other';

export interface Asset {
  id: string;
  name: string;
  type: AssetType;
  description?: string;
  value: number;
  acquisitionDate: string;
  acquisitionMethod: string;
  documentPath?: string;
  userId: string;
}

export interface AssetAnalysis {
  currentValue: number;
  appreciation: number;
  marketComparison: {
    averageValue: number;
    percentileDifference: number;
  };
  recommendations: string[];
  alerts: {
    type: 'warning' | 'info';
    message: string;
  }[];
}