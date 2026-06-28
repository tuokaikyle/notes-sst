import { createContext, useContext } from 'react';

type Person = {
  id: number;
  name: string;
  debtors: Record<number, number>; // People who owe this person
  creditors: Record<number, number>; // People whom this person owes
};

export interface FinanceContextType {
  persons: Person[];
  names: [];
}

export const FinanceContext = createContext<FinanceContextType>({
  persons: [],
  names: [],
  person: '',
});
