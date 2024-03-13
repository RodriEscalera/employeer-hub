export interface RegisterServiceRequest {
  firstname: string;
  lastname: string;
  email: string;
  dni: string;
  phone: string;
  password: string;
}

export interface UpdateServiceRequest {
  firstname: string;
  lastname: string;
  email: string;
  dni: string;
  phone: string;
}
export interface LoginServiceRequest {
  email: string;
  password: string;
}

export interface UserProps {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  dni: string;
  is_admin: boolean;
  phone: string;
  password: string;
}

export interface CreateUserServiceRequest {
  firstname: string;
  lastname: string;
  email: string;
  dni: string;
  phone: string;
  password: string;
}
