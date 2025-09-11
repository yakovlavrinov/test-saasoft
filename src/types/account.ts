export type AccountType = "LDAP" | "Локальная";

export interface Account {
  id: string;
  labels: { text: string }[];
  type: AccountType;
  login: string;
  password: string | null;
  errors?: {
    labels?: string;
    login?: string;
    password?: string;
  };
}
