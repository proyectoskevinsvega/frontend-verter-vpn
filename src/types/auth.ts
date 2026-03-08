export interface User {
  id: string;
  email: string;
  name: string;
  two_factor_enabled: boolean;
  tenant_ids?: string[];
  created_at: string;
}

export interface AuthResponse {
  user: User;
  message?: string;
  requires_2fa?: boolean;
}

export interface CsrfResponse {
  csrf_token: string;
}
