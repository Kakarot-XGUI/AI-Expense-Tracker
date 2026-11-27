import getBestWorstExpense from '@/app/actions/getBestWorstExpense';
import getUserRecord from '@/app/actions/getUserRecord';
import { formatCurrency } from '@/lib/formatCurrency';

export default async function ExpenseStats() {
  const [userRecordResult, rangeResult] = await Promise.all([
    getUserRecord(),
    getBestWorstExpense(),
  ]);

  if (userRecordResult.error || rangeResult.error) {
    return (
      <section className='panel stats-panel' aria-labelledby='stats-title'>
        <div className='panel-header'>
          <div className='panel-heading'>
            <span className='panel-icon' aria-hidden='true'>▥</span>
            <div>
              <h2 className='panel-title' id='stats-title'>
                Expense Statistics
              </h2>
              <p className='panel-subtitle'>Your spending insights and ranges</p>
            </div>
          </div>
        </div>
        <p className='chart-error' role='alert'>
          {userRecordResult.error || rangeResult.error}
        </p>
      </section>
    );
  }

  const total = userRecordResult.record ?? 0;
  const days = userRecordResult.daysWithRecords ?? 0;
  const average = days > 0 ? total / days : 0;
  const highest = rangeResult.bestExpense ?? 0;
  const lowest = rangeResult.worstExpense ?? 0;

  return (
    <section className='panel stats-panel' aria-labelledby='stats-title'>
      <div className='panel-header'>
        <div className='panel-heading'>
          <span className='panel-icon' aria-hidden='true'>
            <svg
              width='17'
              height='17'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='1.8'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path d='M4 19V5m0 14h17' />
              <path d='m7 15 4-4 3 2 6-7' />
            </svg>
          </span>
          <div>
            <h2 className='panel-title' id='stats-title'>
              Expense Statistics
            </h2>
            <p className='panel-subtitle'>Your spending insights and ranges</p>
          </div>
        </div>
        <span className='stats-expand' aria-hidden='true'>↗</span>
      </div>

      <div className='stats-average'>
        <span className='stats-average-label'>Average daily spending</span>
        <strong>{formatCurrency(average)}</strong>
        <small>
          <span aria-hidden='true'>✓</span> Based on {days} days with expenses
        </small>
        <svg
          className='stats-sparkline'
          viewBox='0 0 110 52'
          fill='none'
          aria-hidden='true'
        >
          <path
            d='M2 42c17-2 17-11 30-10 11 1 11-7 23-6 13 1 14 15 27 9 10-5 15-21 26-31'
            stroke='#39B77B'
            strokeWidth='2'
            strokeLinecap='round'
          />
          <path
            d='M2 42c17-2 17-11 30-10 11 1 11-7 23-6 13 1 14 15 27 9 10-5 15-21 26-31v48H2Z'
            fill='url(#spark-fill)'
            fillOpacity='.2'
          />
          <defs>
            <linearGradient id='spark-fill' x1='55' y1='0' x2='55' y2='52'>
              <stop stopColor='#1BA86D' />
              <stop offset='1' stopColor='#1BA86D' stopOpacity='0' />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className='stats-ranges'>
        <div className='stats-range high'>
          <span className='stats-range-icon' aria-hidden='true'>↑</span>
          <div>
            <span>Highest</span>
            <strong>{formatCurrency(highest)}</strong>
          </div>
        </div>
        <div className='stats-range low'>
          <span className='stats-range-icon' aria-hidden='true'>↓</span>
          <div>
            <span>Lowest</span>
            <strong>{formatCurrency(lowest)}</strong>
          </div>
        </div>
      </div>
    </section>
  );
}
