import type { Account, LSAccount } from '../types/account';

export function setLSAccounts(accounts) {
  localStorage.setItem(
    'accData',
    JSON.stringify({
      accData: accounts,
    }),
  );
}

export function getLSAccData() {
  return localStorage.getItem('accData');
}

export function convertToLSAccount(account: Account): LSAccount {
  const labels = new Set<string>();

  account.labels.split(';').forEach((label: string) => {
    const formatLabel = label.trim();
    if (formatLabel !== '') {
      labels.add(formatLabel);
    }
  });

  return {
    ...account,
    labels: Array.from(labels).map((label) => {
      return {
        text: label,
      };
    }),
  };
}
