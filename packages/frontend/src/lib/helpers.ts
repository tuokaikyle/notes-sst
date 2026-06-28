import { Selected } from '../pages/Demo2';

type Person = {
  name: string;
  balance: number; // Positive if owed money, negative if owes money
};

export function optimizeDebts(people: Selected[]): string[] {
  const balances: Record<string, number> = {};

  // Calculate net balances for each person
  people.forEach((person) => {
    person.iPayMoneyTo?.forEach((transaction) => {
      balances[person.name] = (balances[person.name] || 0) - transaction.amount;
      balances[transaction.name] =
        (balances[transaction.name] || 0) + transaction.amount;
    });
    person.othersPayMe?.forEach((transaction) => {
      balances[person.name] = (balances[person.name] || 0) + transaction.amount;
      balances[transaction.name] =
        (balances[transaction.name] || 0) - transaction.amount;
    });
  });

  // Separate creditors and debtors
  const creditors: Person[] = [];
  const debtors: Person[] = [];

  Object.keys(balances).forEach((name) => {
    if (balances[name] > 0) {
      creditors.push({ name, balance: balances[name] });
    } else if (balances[name] < 0) {
      debtors.push({ name, balance: -balances[name] });
    }
  });

  // Sort creditors and debtors by the amount they're owed or owe to optimize matching
  creditors.sort((a, b) => b.balance - a.balance);
  debtors.sort((a, b) => b.balance - a.balance);

  const transactions = [];

  // Optimize transactions by settling debts from the largest to the smallest
  let i = 0,
    j = 0;
  while (i < creditors.length && j < debtors.length) {
    const creditor = creditors[i];
    const debtor = debtors[j];
    const amount = Math.min(creditor.balance, debtor.balance);

    transactions.push(`${debtor.name} pays $${amount} to ${creditor.name}`);

    creditor.balance -= amount;
    debtor.balance -= amount;

    if (creditor.balance === 0) i++;
    if (debtor.balance === 0) j++;
  }

  return transactions;
}

export const testData = [
  {
    name: 'Alice',
    status: 'success',
    iPayMoneyTo: [
      { name: 'Bob', amount: 100 },
      { name: 'Charlie', amount: 75 },
      { name: 'Diana', amount: 50 },
    ],
    othersPayMe: [
      { name: 'Ethan', amount: 75 },
      { name: 'Fiona', amount: 65 },
    ],
  },
  {
    name: 'Bob',
    status: 'success',
    iPayMoneyTo: [
      { name: 'Charlie', amount: 50 },
      { name: 'Diana', amount: 40 },
      { name: 'Gina', amount: 30 },
    ],
    othersPayMe: [
      { name: 'Alice', amount: 100 },
      { name: 'Hank', amount: 20 },
    ],
  },
  {
    name: 'Charlie',
    status: 'success',
    iPayMoneyTo: [
      { name: 'Alice', amount: 150 },
      { name: 'Fiona', amount: 60 },
      { name: 'Isabella', amount: 45 },
    ],
    othersPayMe: [{ name: 'Julia', amount: 55 }],
  },
  {
    name: 'Diana',
    status: 'success',
    iPayMoneyTo: [
      { name: 'Ethan', amount: 30 },
      { name: 'Gina', amount: 20 },
      { name: 'Bob', amount: 15 },
    ],
    othersPayMe: [
      { name: 'Alice', amount: 50 },
      { name: 'Charlie', amount: 25 },
    ],
  },
  {
    name: 'Ethan',
    status: 'success',
    iPayMoneyTo: [
      { name: 'Hank', amount: 85 },
      { name: 'Isabella', amount: 40 },
    ],
    othersPayMe: [
      { name: 'Diana', amount: 30 },
      { name: 'Bob', amount: 60 },
    ],
  },
  {
    name: 'Fiona',
    status: 'success',
    iPayMoneyTo: [
      { name: 'Charlie', amount: 60 },
      { name: 'Isabella', amount: 45 },
      { name: 'Alice', amount: 30 },
    ],
    othersPayMe: [
      { name: 'Gina', amount: 15 },
      { name: 'Julia', amount: 20 },
    ],
  },
  {
    name: 'Gina',
    status: 'success',
    iPayMoneyTo: [
      { name: 'Isabella', amount: 95 },
      { name: 'Bob', amount: 50 },
    ],
    othersPayMe: [
      { name: 'Diana', amount: 20 },
      { name: 'Charlie', amount: 10 },
      { name: 'Ethan', amount: 25 },
    ],
  },
  {
    name: 'Hank',
    status: 'success',
    iPayMoneyTo: [
      { name: 'Julia', amount: 130 },
      { name: 'Bob', amount: 60 },
    ],
    othersPayMe: [
      { name: 'Ethan', amount: 85 },
      { name: 'Alice', amount: 45 },
    ],
  },
  {
    name: 'Isabella',
    status: 'success',
    iPayMoneyTo: [
      { name: 'Gina', amount: 95 },
      { name: 'Fiona', amount: 45 },
      { name: 'Charlie', amount: 30 },
    ],
    othersPayMe: [{ name: 'Charlie', amount: 25 }],
  },
  {
    name: 'Julia',
    status: 'success',
    iPayMoneyTo: [],
    othersPayMe: [
      { name: 'Hank', amount: 130 },
      { name: 'Charlie', amount: 55 },
      { name: 'Fiona', amount: 30 },
    ],
  },
];
