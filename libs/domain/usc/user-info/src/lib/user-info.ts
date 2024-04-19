export function userInfo(): string {
  return 'user-info';
}
export interface UserInfo {
  username?: string;
  permissions?: string[];
  access_token?: string;
  userid?: string;
  expires_in?: number;
}
