import React, { useState } from 'react';
import { ComposedChart, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card } from '@/components/ui/card';
import TransactionCount from '@/components/svg Icons/TransactionCount';
import TotalValue from '@/components/svg Icons/TotalValue';

// Mock data - this would typically be imported from lib/mockData.ts
const mockData = [
  { month: 'Jan', revenue: 50, sales: 30 },
  { month: 'Feb', revenue: 140, sales: 230 },
  { month: 'Mar', revenue: 200, sales: 160 },
  { month: 'Apr', revenue: 160, sales: 200 },
  { month: 'May', revenue: 150, sales: 160 },
  { month: 'Jun', revenue: 210, sales: 150 },
  { month: 'Jul', revenue: 150, sales: 80 },
  { month: 'Aug', revenue: 250, sales: 240 },
  { month: 'Sep', revenue: 260, sales: 190 },
  { month: 'Oct', revenue: 270, sales: 190 },
  { month: 'Nov', revenue: 310, sales: 150 },
  { month: 'Dec', revenue: 370, sales: 360 },
  { month: 'Jan', revenue: 420, sales: 330 },
  { month: 'Feb', revenue: 360, sales: 340 }
];

         // eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: any[]; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3 min-w-[180px]">
        <div className="text-sm text-gray-600 mb-2">{label}</div>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center justify-between mb-1">
            <div className="flex items-center">
              <div 
                className="w-2 h-2 rounded-full mr-2"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-sm text-gray-700">{entry.dataKey === 'revenue' ? 'Total Revenue' : 'Total Sales'}</span>
            </div>
            <span className="text-sm font-semibold">
              {entry.dataKey === 'revenue' ? `₦${entry.value.toLocaleString()}` : entry.value}
            </span>
          </div>
        ))}
        <div className="text-xs text-gray-500 mt-2">
          12.04.2022 - 12.06.2022
        </div>
      </div>
    );
  }
  return null;
};

interface TimeRangeSelectorProps {
  activeRange: string;
  onRangeChange: (range: string) => void;
}

const TimeRangeSelector = ({ activeRange, onRangeChange }: TimeRangeSelectorProps) => {
  const ranges = ['1D', '1W', '1M', '1Y', 'Max'];
  
  return (
    <div className="flex bg-gray-100 dark:bg-background rounded-lg p-1">
      {ranges.map((range) => (
        <button
          key={range}
          onClick={() => onRangeChange(range)}
          className={`px-3 py-1 text-sm rounded-md transition-colors ${
            activeRange === range
              ? 'bg-white dark:bg-card shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          {range}
        </button>
      ))}
    </div>
  );
};

const ChartComponent = () => {
  const [activeRange, setActiveRange] = useState('1Y');
  const [hoveredData, setHoveredData] = useState<{ revenue: number; sales: number; month: string } | null>(null);

           // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleMouseMove = (data: any) => {
    if (data?.activePayload?.[0]?.payload) {
      const { revenue, sales, month } = data.activePayload[0].payload;
      setHoveredData({ revenue, sales, month });
    }
  };

  const handleMouseLeave = () => {
    setHoveredData(null);
  };

  return (
    <Card className="w-full p-6 rounded-lg">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div className="flex space-x-8">
          <div>
            <div className="flex items-center mb-1 gap-1">
              <TotalValue/>
              <span className="text-sm font-medium text-[#640400]">Total Revenue</span>
            </div>
            <div className="text-xs">12.04.2022 - 12.06.2022</div>
            <div className="text-lg font-semibold text-gray-900 mt-1">
              ₦{hoveredData?.revenue?.toLocaleString() || '280,790'}
            </div>
          </div>
          <div>
            <div className="flex items-center mb-1 gap-1">
            <TransactionCount/>
              <span className="text-sm font-medium text-[#C80000]">Total Sales</span>
            </div>
            <div className="text-xs ">12.04.2022 - 12.06.2022</div>
            <div className="text-lg font-semibold text-gray-900 mt-1">
              {hoveredData?.sales?.toLocaleString() || '250'}
            </div>
          </div>
        </div>
        
        <TimeRangeSelector 
          activeRange={activeRange}
          onRangeChange={setActiveRange}
        />
      </div>

      {/* Chart */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={mockData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <defs>
              <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ef4444" stopOpacity={0.3}/>
                <stop offset="100%" stopColor="#ef4444" stopOpacity={0.05}/>
              </linearGradient>
            </defs>
            
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="#f0f0f0"
              horizontal={true}
              vertical={false}
            />
            
            <XAxis 
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#666' }}
            />
            
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#666' }}
              domain={[0, 500]}
            />
            
            <Tooltip 
              content={<CustomTooltip />}
              cursor={{ stroke: '#e5e7eb', strokeWidth: 1 }}
            />
            
            {/* Area for sales with gradient fill */}
            <Area
              type="monotone"
              dataKey="sales"
              stroke="#ef4444"
              strokeWidth={2}
              fill="url(#salesGradient)"
              dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: '#ef4444' }}
            />
            
            {/* Line for revenue */}
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#374151"
              strokeWidth={2}
              dot={{ fill: '#374151', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: '#374151' }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default ChartComponent;