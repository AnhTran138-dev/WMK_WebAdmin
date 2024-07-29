export interface UserList {
  id: string;
  email: string;
  userName: string;
  emailConfirm: string;
  firstName: string;
  lastName: string;
  gender: Gender;
  phone: string;
  address: null;
  role: string;
  accessFailedCount: number;
  status: Status;
}

export enum Gender {
  Male = "Male",
}

export enum Status {
  Available = "Available",
}
