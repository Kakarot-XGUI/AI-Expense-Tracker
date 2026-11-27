import getRecords from '@/app/actions/getRecords';
import RecordHistoryList from '@/components/RecordHistoryList';

export default async function RecordHistory() {
  const { records, error } = await getRecords();

  return (
    <section className='panel history-panel' id='expense-history'>
      <div className='panel-header'>
        <div className='panel-heading'>
          <span className='panel-icon' aria-hidden='true'>◷</span>
          <div>
            <h2 className='panel-title'>Expense History</h2>
            <p className='panel-subtitle'>Your spending timeline</p>
          </div>
        </div>
        {records && records.length > 0 && (
          <span className='history-count'>
            {records.length} {records.length === 1 ? 'record' : 'records'}
          </span>
        )}
      </div>

      {error ? (
        <p className='chart-error' role='alert'>
          Could not load expense history. {error}
        </p>
      ) : records && records.length > 0 ? (
        <RecordHistoryList records={records} />
      ) : (
        <div className='history-empty'>
          <span className='history-empty-icon' aria-hidden='true'>◷</span>
          <div>
            <h3>No Expense Records Found</h3>
            <p>Start tracking your expenses to see your spending history here.</p>
          </div>
        </div>
      )}
    </section>
  );
}
