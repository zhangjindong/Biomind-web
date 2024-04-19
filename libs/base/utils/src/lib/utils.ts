import { Observable, map, mergeMap, of } from 'rxjs';
import { ajax } from 'rxjs/ajax';

export function utils(): string {
  return 'utils';
}

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
  TInput , // The input
  TOutput // The output
>(
  opts: {
    url: string;
    method: 'GET' | 'POST';
  },
  callback?: (input: TInput) => TInput
) => (input: TInput) => Observable<TOutput>;

export const CreateAPIMethod: CreateAPIMethod = (opts, callback) => (input) =>
  ajax({
    url: opts.url,
    method: opts.method,
    body: callback ? callback(input) : input,
  }).pipe(
    map((res) => <BiomindResponse<any>>res.response),

    mergeMap((res) => (res.success ? of(res.data) : of(res.error_message?.cn)))
  );
