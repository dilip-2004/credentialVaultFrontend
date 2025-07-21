export interface LoginRequest {
  email: string;
  password: string;
  role: 'User' | 'Admin';
}

export interface LoginResponse {
  accessToken: string;
  user: {
    _id: string;
    name: string;
    email: string;
    role: 'User' | 'Admin';
    createdAt: string;
    updatedAt: string;
  };
}

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
}

export interface SignupResponse {
  message: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  user: UserProfile;
}

export interface UserProfile {
  _id: string;
  name: string;
  email: string;
  role: 'User' | 'Admin';
  createdAt: string;
  updatedAt: string;
}

export interface NameChangeRequest {
  name: string;
}

export interface PasswordChangeRequest {
  oldPassword: string;
  newPassword: string;
}

export interface ProfileUpdateResponse {
  message: string;
}

export interface GetUserByIdResponse {
  user: UserProfile;
  CredentialsCount: number;
}

