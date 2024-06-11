import { UserInfo } from '@biomind-web/user-info';
import { redirect } from 'react-router-dom';
import {
  Observable,
  catchError,
  map,
  mergeMap,
  of,
  tap,
  throwError,
} from 'rxjs';
import { AjaxError, ajax } from 'rxjs/ajax';

export type BiomindResponse<T> = {
  data: T;
  success: boolean;
  error_code?: string;
  error_message?: {
    cn?: string;
    detail?: string;
    en?: string;
  };
};

export type CreateAPIMethod = <
  TInput, // The input
  TOutput // The output
>(
  opts: {
    url: string;
    method: 'GET' | 'POST';
  },
  callback?: (input: TInput) => TInput
) => (input: TInput) => Observable<TOutput>;

export const CreateAPIMethod: CreateAPIMethod = (opts, callback) => (input) => {
  const userInfo = <UserInfo>(
    JSON.parse(localStorage.getItem('UserInfo') || '{}')
  );
  return ajax({
    url: opts.url,
    method: opts.method,
    [opts.method == 'GET' ? 'queryParams' : 'body']: callback
      ? callback(input)
      : input,

    headers: {
      Authorization: `Bearer ${
        typeof userInfo != 'string' ? userInfo?.access_token : ''
      }`,
    },
  }).pipe(
    map((res) => <BiomindResponse<any>>res.response),

    mergeMap((res) => (res.success ? of(res.data) : of(res.error_message?.cn))),
    catchError((error: AjaxError) => {
      return throwError(() => error);
      // tap(() => {
      //   console.log('Error: ' + error.message);
      //   throw error;
      // })
      // return of(null);
    })
  );
};
