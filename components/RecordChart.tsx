import getRecords from '@/app/actions/getRecords';
import ExpenseDonutChart from '@/components/ExpenseDonutChart';

export default async function RecordChart() {
  const { records, error } = await getRecords();

  return (
    <section className='panel chart-panel' aria-labelledby='expense-chart-title'>
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
              <rect x='3' y='12' width='4' height='8' rx='1' />
              <rect x='10' y='8' width='4' height='12' rx='1' />
              <rect x='17' y='4' width='4' height='16' rx='1' />
            </svg>
          </span>
          <div>
            <h2 className='panel-title' id='expense-chart-title'>
              Expense Chart
            </h2>
            <p className='panel-subtitle'>Visual representation of your spending</p>
          </div>
        </div>
      </div>

      {error ? (
        <p className='chart-error' role='alert'>
          Could not load chart data. {error}
        </p>
      ) : (
        <ExpenseDonutChart
          records={(records ?? []).map((record) => ({
            amount: record.amount,
            category: record.category,
            date: new Date(record.date).toISOString(),
          }))}
        />
      )}
    </section>
  );
}
