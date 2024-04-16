import { Subject } from 'rxjs';
import { Price } from './model';

export const pricesDto$ = new Subject<Price>();
export const resetPrices$ = new Subject();
