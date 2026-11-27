'use client';

import { useState } from 'react';
import deleteRecord from '@/app/actions/deleteRecord';
import { formatCurrency } from '@/lib/formatCurrency';
import { Record as ExpenseRecord } from '@/types/Record';

const categoryIcons: Record<string, string> = {
  Food: '🍴',
  Transportation: '🚗',
  Shopping: '🛍',
  Entertainment: '♫',
  Bills: '💡',
  Healthcare: '✚',
};

export default function RecordItem({ record }: { record: ExpenseRecord }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const result = await deleteRecord(record.id);
      if (result.error) {
        console.error('Could not delete expense:', result.error);
      }
    } catch (error) {
      console.error('Could not delete expense:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <article className='history-item'>
      <button
        className='history-delete'
        type='button'
        onClick={handleDelete}
        disabled={isLoading}
        aria-label={`Delete ${record.text}`}
        title='Delete expense'
      >
        {isLoading ? '…' : '×'}
      </button>
      <div className='history-item-top'>
        <span className='history-date'>
          {new Date(record.date).toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            timeZone: 'UTC',
          })}
        </span>
        <strong className='history-amount'>
          {formatCurrency(record.amount)}
        </strong>
      </div>
      <div className='history-item-category'>
        <span className='history-category'>
          {categoryIcons[record.category] ?? '◈'} {record.category}
        </span>
      </div>
      <p className='history-description' title={record.text}>
        {record.text}
      </p>
    </article>
  );
}
