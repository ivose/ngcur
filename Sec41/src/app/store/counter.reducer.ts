import { createReducer, on } from '@ngrx/store';
import { increment, decrement } from './counter.actions';
import { CounterState } from './counter.state';

export const initialState: CounterState = {
  count: 0
};

export const counterReducer = createReducer(
  initialState,
  on(increment, (state) => ({
    ...state,
    count: state.count + 1
  })),
  on(decrement, (state) => ({
    ...state,
    count: state.count - 1
  }))
);
