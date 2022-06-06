export interface AuthenticationProviderState {
  token?: string;
  error?: string;
  loading: boolean;
  userRole?: string;
  username?: string;
  idDiscord?: string;
}
