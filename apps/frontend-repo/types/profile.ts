export interface IUserProfile {
  id?: string;
  accountId: string;
  fullName: string;
  age: number;
  address: string[];
  university: {
    bachelor: string;
    master: string;
  };
}
