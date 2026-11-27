'use client';

import { useMemo } from 'react';
import { useExpenseSearch } from '@/contexts/ExpenseSearchContext';
import { Record } from '@/types/Record';
import RecordItem from '@/components/RecordItem';

export default function RecordHistoryList({
  records,
}: {
  records: Record[];
}) {
  const { query } = useExpenseSearch();
  const filteredRecords = useMemo(() => {
    const searchTerm = query.trim().toLowerCase();
    if (!searchTerm) return records;

    return records.filter((record) =>
      `${record.text} ${record.category} ${record.amount}`
        .toLowerCase()
        .includes(searchTerm)
    );
  }, [query, records]);

  if (filteredRecords.length === 0) {
    return (
      <p className='history-no-results'>
        No expenses match “{query}”. Try another search.
      </p>
    );
  }

  return (
    <div className='history-list'>
      {filteredRecords.map((record) => (
        <RecordItem key={record.id} record={record} />
      ))}
    </div>
  );
}
