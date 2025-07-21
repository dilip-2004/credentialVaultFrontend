export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'User' | 'Admin';
  createdAt: string;
  updatedAt: string;
}

export interface GetAllUsersResponse {
  users: User[];
  totalPages: number;
  currentPage: number;
  totalUsers: number;
}

export interface GetAllUsersRequest {
  page: number;
  limit: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface GetUserByIdResponse {
  user: User;
  CredentialsCount: number;
}

