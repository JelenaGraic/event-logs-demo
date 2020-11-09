import { createSelector } from '@ngrx/store';
import * as FromAppState from '../index';
import { getFilters, getPagination } from '../reducers/events.reducer';


export const getEventState = createSelector(
    FromAppState.selectAppState,
    (state: FromAppState.AppState) => state.events
  );

export const selectFilter = createSelector(
  getEventState,
      getFilters
);

export const selectPages = createSelector(
  getEventState,
      getPagination
);
