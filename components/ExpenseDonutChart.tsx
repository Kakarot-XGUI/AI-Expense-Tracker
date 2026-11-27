'use client';

import { useMemo, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  ArcElement,
  Chart as ChartJS,
  Tooltip,
  type ChartData,
  type ChartOptions,
} from 'chart.js';
import { formatCurrency } from '@/lib/formatCurrency';

ChartJS.register(ArcElement, Tooltip);

interface ExpenseChartRecord {
  amount: number;
  category: string;
  date: string;
}

type Period = 'this-month' | 'last-month' | 'all';

const categoryColors = ['#35bd82', '#f0b84c', '#168f66', '#a8ddbc', '#ef8378', '#4b9ed0'];
const defaultCategories = ['Food & Dining', 'Shopping', 'Travel', 'Others'];

function getCategoryLabel(category: string) {
  if (category === 'Food') return 'Food & Dining';
  if (category === 'Transportation') return 'Travel';
  if (category === 'Other') return 'Others';
  return category;
}

export default function ExpenseDonutChart({
  records,
}: {
  records: ExpenseChartRecord[];
}) {
  const [period, setPeriod] = useState<Period>('this-month');
  const categoryTotals = useMemo(() => {
    const now = new Date();
    const totals = new Map<string, number>();

    for (const record of records) {
      const date = new Date(record.date);
      const isThisMonth =
        date.getUTCFullYear() === now.getUTCFullYear() &&
        date.getUTCMonth() === now.getUTCMonth();
      const isLastMonth =
        date.getUTCFullYear() ===
          (now.getUTCMonth() === 0
            ? now.getUTCFullYear() - 1
            : now.getUTCFullYear()) &&
        date.getUTCMonth() ===
          (now.getUTCMonth() === 0 ? 11 : now.getUTCMonth() - 1);

      if (
        (period === 'this-month' && !isThisMonth) ||
        (period === 'last-month' && !isLastMonth)
      ) {
        continue;
      }

      const label = getCategoryLabel(record.category);
      totals.set(label, (totals.get(label) ?? 0) + record.amount);
    }

    return Array.from(totals.entries())
      .map(([label, amount]) => ({ label, amount }))
      .sort((a, b) => b.amount - a.amount);
  }, [period, records]);

  const categories =
    categoryTotals.length > 0
      ? categoryTotals.slice(0, 5)
      : defaultCategories.map((label) => ({ label, amount: 0 }));
  const total = categories.reduce((sum, item) => sum + item.amount, 0);

  const data: ChartData<'doughnut'> = {
    labels: categories.map((item) => item.label),
    datasets: [
      {
        data: categories.map((item) => item.amount),
        backgroundColor: categories.map(
          (_, index) => categoryColors[index % categoryColors.length]
        ),
        borderColor: '#fafffc',
        borderWidth: 3,
        hoverOffset: 4,
      },
    ],
  };

  const options: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '72%',
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) =>
            `${context.label}: ${formatCurrency(Number(context.raw))}`,
        },
      },
    },
  };

  return (
    <>
      <div className='donut-content'>
        <div className='donut-wrap'>
          <Doughnut data={data} options={options} />
          <div className='donut-center'>
            <strong>{formatCurrency(total)}</strong>
            <span>Total</span>
          </div>
        </div>
        <div className='donut-legend'>
          {categories.map((category, index) => (
            <div className='legend-row' key={category.label}>
              <span
                className='legend-dot'
                style={{
                  backgroundColor:
                    categoryColors[index % categoryColors.length],
                }}
              />
              <span className='legend-label'>{category.label}</span>
              <span className='legend-value'>
                {formatCurrency(category.amount)}
              </span>
            </div>
          ))}
        </div>
      </div>

      <select
        className='panel-select chart-period-select'
        value={period}
        onChange={(event) => {
          const value = event.target.value;
          if (
            value === 'this-month' ||
            value === 'last-month' ||
            value === 'all'
          ) {
            setPeriod(value);
          }
        }}
        aria-label='Chart period'
      >
        <option value='this-month'>This Month</option>
        <option value='last-month'>Last Month</option>
        <option value='all'>All Time</option>
      </select>
    </>
  );
}
