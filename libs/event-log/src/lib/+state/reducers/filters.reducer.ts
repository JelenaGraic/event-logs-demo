import { createReducer, on, Action } from "@ngrx/store";
import { Filter } from '../../+common/filters.model';
import { Pagination } from '../../+common/pagination.model';
import { Sort } from '../../+common/sort.model';
import * as fromAcitions from '../actions/filters.action';


export interface FilterState {
  filter: Filter,
  pagination: Pagination,
  sort: Sort
}

export const initialState: FilterState = {
  filter: {
    dateFrom: null,
    dateTo: new Date(Date.now()),
    logLevels: null
  },
  pagination: {
    page: 0,
    pageSize: 5
  },
  sort: {
    sortField: 'name',
    sortDirection: 'asc'
  }
}

export const reduce = createReducer (
    initialState,
    on(fromAcitions.applyFilter,
      (state, action) => {
        return {
          ...state,
          filter: {...action.filters},
          pagination: {
            ...state.pagination,
            page: 0
          } 
        }
      }
    ),
    on(fromAcitions.applyPagination,
      (state, action) => {
        return {
          ...state,
          pagination: {...action.pagination}        
        }
      }
    ),
    on(fromAcitions.applySort,
      (state, action) => {
        return {
          ...state,
          sort: {...action.sort}
        }
      })
)

export function eventReducer (state: FilterState | undefined, action: Action) {
    return reduce(state, action);
}

export const getFilters = (state: FilterState) => state.filter;
export const getPagination = (state: FilterState) => state.pagination;
export const getSort = (state: FilterState) => state.sort;
