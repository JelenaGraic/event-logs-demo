import { createSelector } from '@ngrx/store';
import * as FromAppState from '../index';
import { getFilters, getPagination, getSort } from '../reducers/filters.reducer';


export const getFilterState = createSelector(
    FromAppState.selectAppState,
    (state: FromAppState.AppState) => state.filters
  );

export const selectFilter = createSelector(
    getFilterState,
      getFilters
);

export const selectPages = createSelector(
    getFilterState,
      getPagination
);

export const selectSort = createSelector(
    getFilterState,
      getSort
);