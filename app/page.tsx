import AddNewRecord from '@/components/AddNewRecord';
import AIInsights from '@/components/AIInsights';
import ExpenseStats from '@/components/ExpenseStats';
import RecordChart from '@/components/RecordChart';
import RecordHistory from '@/components/RecordHistory';

export default function HomePage() {
  return (
    <main className='dashboard-page'>
      <div className='dashboard-grid-top'>
        <section className='welcome-card' aria-labelledby='dashboard-title'>
          <div className='welcome-copy'>
            <p className='welcome-eyebrow'>Your money, in focus</p>
            <h1 className='welcome-title' id='dashboard-title'>
              Your Expense
              <span>Dashboard</span>
            </h1>
            <p className='welcome-description'>
              Track expenses locally, review your spending, and manage your
              budget from one place.
            </p>
            <div className='welcome-actions'>
              <a className='welcome-button' href='#add-expense'>
                <span aria-hidden='true'>＋</span>
                Add Expense
              </a>
              <a className='welcome-button secondary' href='#insights'>
                View Insights <span aria-hidden='true'>→</span>
              </a>
            </div>
          </div>

          <svg
            className='hero-illustration'
            viewBox='0 0 240 145'
            fill='none'
            aria-hidden='true'
          >
            <ellipse cx='135' cy='118' rx='86' ry='14' fill='#041F18' fillOpacity='.2' />
            <path
              d='M25 92c22-21 54-22 78-6 28 18 58 13 83-6 15-11 27-9 38-1'
              stroke='#8BEAB9'
              strokeOpacity='.45'
              strokeWidth='1.5'
              strokeDasharray='3 5'
            />
            <g transform='rotate(-10 133 74)'>
              <rect x='82' y='34' width='104' height='76' rx='12' fill='#78DDA9' fillOpacity='.24' />
              <rect x='94' y='23' width='98' height='76' rx='11' fill='#D9F9E8' />
              <rect x='103' y='33' width='80' height='56' rx='7' fill='#F7FFFA' />
              <path d='M115 76V62h10v14m8 0V50h10v26m8 0V43h10v33' stroke='#20A96E' strokeWidth='6' strokeLinecap='round' />
              <path d='m111 49 15-7 11 3 19-9 13 2' stroke='#89D9AF' strokeWidth='2' strokeLinecap='round' />
            </g>
            <circle cx='195' cy='31' r='17' fill='#F2BE42' />
            <circle cx='195' cy='31' r='13' fill='#FFD96B' />
            <path d='M195 21v20m4-15c-1-2-2-3-5-3-3 0-5 2-5 4 0 6 10 3 10 9 0 2-2 4-5 4s-5-1-6-3' stroke='#AC7815' strokeWidth='1.5' strokeLinecap='round' />
            <circle cx='69' cy='103' r='12' fill='#F2BE42' />
            <circle cx='69' cy='103' r='8.5' fill='#FFD96B' />
            <path d='M69 97v12m2-9c-.5-1-1-1.5-2-1.5-2 0-3 1-3 2 0 3 6 2 6 5 0 1-1 2-3 2-1.5 0-2.5-.5-3-1.5' stroke='#AC7815' strokeWidth='1.2' strokeLinecap='round' />
            <path d='m56 40 2.2 5.3 5.8.5-4.4 3.8 1.3 5.7-4.9-3-4.9 3 1.2-5.7-4.3-3.8 5.8-.5L56 40Z' fill='#F4D55B' />
            <path d='m215 77 1.5 3.4 3.8.3-2.8 2.4.8 3.7-3.3-1.9-3.2 1.9.8-3.7-2.9-2.4 3.8-.3 1.5-3.4Z' fill='#8DE8B9' />
          </svg>
        </section>

        <RecordChart />
      </div>

      <div className='dashboard-grid-middle'>
        <AddNewRecord />
        <ExpenseStats />
      </div>

      <AIInsights />
      <RecordHistory />
    </main>
  );
}
