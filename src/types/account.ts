export type AccountType = "LDAP" | "Локальная";

export interface Account {
  id: string;
  labels: { text: string }[];
  type: AccountType;
  login: string;
  password: string | null;
}

export type Errors = {
  labels?: string;
  type?: string;
  login?: string;
  password?: string;
};
