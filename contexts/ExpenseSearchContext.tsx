'use client';

import { createContext, useContext, useState } from 'react';

interface ExpenseSearchContextValue {
  query: string;
  setQuery: (query: string) => void;
}

const ExpenseSearchContext = createContext<ExpenseSearchContextValue | null>(
  null
);

export function ExpenseSearchProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [query, setQuery] = useState('');

  return (
    <ExpenseSearchContext.Provider value={{ query, setQuery }}>
      {children}
    </ExpenseSearchContext.Provider>
  );
}

export function useExpenseSearch() {
  const context = useContext(ExpenseSearchContext);
  if (!context) {
    throw new Error(
      'useExpenseSearch must be used within an ExpenseSearchProvider'
    );
  }
  return context;
}
