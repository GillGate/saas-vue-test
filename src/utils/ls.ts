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
