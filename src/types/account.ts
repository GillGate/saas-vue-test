interface BaseAccount {
  labels: string;
  login: string;
}

interface LocalAccount extends BaseAccount {
  type: 'local';
  password: string;
}

interface LdapAccount extends BaseAccount {
  type: 'ldap';
  password: null;
}

export type Account = LocalAccount | LdapAccount;

interface Label {
  text: string;
}

export type LSAccount = Omit<Account, 'labels'> & {
  labels: Label[];
};
