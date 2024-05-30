import { CreateAPIMethod } from '@biomind-web/utils';
export interface UserSettingRequest {
  user_id: string;
}

export interface Setting<T> {
  user_id: string;
  type: string;
  settings: T;
}

export interface UserColumnsSetting {
  msgCode: string;
  sort_columns: { [key: string]: number };
  select_columns: string[];
}

export interface UserLanguage {
  language: 'cn' | 'en';
}

/**
 *  UserSettingFn
 * 申明一个通用的UserSetting 函数
 */
export const UserSettingFn = <T>(type: string) =>
  CreateAPIMethod<UserSettingRequest, Setting<T>>(
    {
      method: 'GET',
      url: '/apiv3/settings/user_settings/',
    },
    (input) => ({ ...input, type })
  );

export const apiUserColumns = UserSettingFn<UserColumnsSetting>('worklist');

export const apiUserLanguage = UserSettingFn<UserLanguage>('language');
