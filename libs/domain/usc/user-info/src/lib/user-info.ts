export function userInfo(): string {
  return 'user-info';
}
export interface UserInfo {
  username?: string;
  permissions?: unknown[];
  access_token?: string;
}
