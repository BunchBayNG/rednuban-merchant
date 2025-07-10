'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { transactionFlowData } from '@/lib/mockData';

export function StaffsChart() {
  const [activeRange, setActiveRange] = useState('1Y');
  // const highlightedPoint = transactionFlowData.find(point => point.month === 'Jun');
  const ranges = ['1D', '1W', '1M', '1Y', 'Max'];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Merchants Total Transaction Flow
          </CardTitle>

          <div className="flex bg-gray-100 dark:bg-background rounded-lg p-1">
            {ranges.map((range) => (
              <button
                key={range}
                onClick={() => setActiveRange(range)}
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
        </div>
        <div className="text-2xl font-bold">10,000</div>
      </CardHeader>

      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={transactionFlowData} barCategoryGap="20%">
              <XAxis 
                dataKey="month" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6B7280' }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6B7280' }}
                tickFormatter={(value) => `${value / 1000}k`}
              />
              <Tooltip
                formatter={(value: number) => [value.toLocaleString(), 'Transactions']}
                labelFormatter={(label) => `Month: ${label}`}
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: 'none',
                  borderRadius: '6px',
                  color: 'white'
                }}
              />
              <Bar 
                dataKey="value" 
                fill="#dc2626"
                radius={[2, 2, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
