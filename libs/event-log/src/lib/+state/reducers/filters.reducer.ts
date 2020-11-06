import { createReducer, on, Action } from "@ngrx/store";
import { Filter } from '../../+common/filters.model';
import { Pagination } from '../../+common/pagination.model';
import * as fromAcitions from '../actions/filters.action';


export interface FilterState {
  filter: Filter,
  pagination: Pagination
}

export const initialState: FilterState = {
  filter: {
    from: null,
    to: null
  },
  pagination: {
    page: 1,
    pageSize: 5
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
            page: 1
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
    )
)

export function eventReducer (state: FilterState | undefined, action: Action) {
    return reduce(state, action);
}

export const getFilters = (state: FilterState) => state.filter;
export const getPagination = (state: FilterState) => state.pagination;
