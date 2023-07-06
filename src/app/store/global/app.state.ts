import { createAction, createFeature, createReducer, on } from '@ngrx/store';
import { createEffect } from '@ngrx/effects';
import { interval, map } from 'rxjs';

// state
interface CounterState {
  counter: number;
}

// initialize state
const initialCounterState: CounterState = {
  counter: 0,
};

// register action
export const incrementCounter = createAction(
  '[Angular Snippets Example] Increment Counter'
);

// register reducer
export const counterState = createFeature({
  name: 'counter',
  reducer: createReducer(
    initialCounterState,
    on(incrementCounter, (state) => ({
      ...state,
      counter: state.counter + 1,
    }))
  ),
});

// selector
export const { selectCounter } = counterState;

// effect
// export const incrementCounterEffect = createEffect(
//   () => interval(1000).pipe(map(() => incrementCounter())),
//   { functional: true }
// );
