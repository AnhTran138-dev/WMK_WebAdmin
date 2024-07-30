export interface UserRequest {
  email: string;
  firstName: string;
  lastName: string;
  gender: number;
  phone: string;
  address: string;
  role: number;
}

export interface UpdateUserRequest {
  id: string;
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: number;
  phone: string;
  address: string;
}
