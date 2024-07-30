export interface LoginRequest {
  emailOrUserName: string;
  password: string;
}

export enum UserRole {
  Admin = "Admin",
  Manager = "Manager",
  Staff = "Staff",
  Shipper = "Shipper",
  Customer = "Customer",
}
