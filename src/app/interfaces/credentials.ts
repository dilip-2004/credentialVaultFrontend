export interface Credentials {
  id: string;
  appName: string;
  appUserName: string;
  appPassword: string;
  appLink?: string;
  maskedPassword: string;
  createdAt: string;
  updatedAt: string;
}

export interface CredentialsGetResponse {
  credentials: Credentials[];
  totalPages: number;
  currentPage: number;
  total: number;
}

export interface CredentialsGetRequest {
  page: number;
  limit: number;
  search?: string;
  sort?: string;
}

export interface CredentialsPostRequest {
  appName: string;
  appUserName: string;
  appPassword: string;
  appLink?: string;
}

export interface CredentialsUpdateRequest {
  appName?: string;
  appUserName?: string;
  appPassword?: string;
  appLink?: string;
}

export interface CredentialsGetResponseByID {
  id: string;
  appName: string;
  appUserName: string;
  appPassword: string;
  appLink?: string;
  maskedPassword: string;
  createdAt: string;
  updatedAt: string;
}

export interface DecryptCredentialRequest {
  credentialId: string;
  userPassword: string;
}

export interface DecryptCredentialResponse {
  decryptedPassword: string;
}

