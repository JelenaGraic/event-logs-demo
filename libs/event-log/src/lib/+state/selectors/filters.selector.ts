import { createSelector } from '@ngrx/store';
import * as FromAppState from '../index';
import { FilterState, getFilters, getPage } from '../reducers/filters.reducer';


export const getFilterState = createSelector(
    FromAppState.selectAppState,
    (state: FromAppState.AppState) => state.filters
  );

export const selectFilter = createSelector(
    getFilterState,
      getFilters
);

export const selectPage = createSelector(
    getFilterState,
      getPage
);