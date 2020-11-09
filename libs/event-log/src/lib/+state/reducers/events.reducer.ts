import { createReducer, on, Action } from "@ngrx/store";
import { Filter } from '../../+common/filters.model';
import { Pagination } from '../../+common/pagination.model';
import * as fromAcitions from '../actions/events.action';


export interface EventState {
  filter: Filter,
  pagination: Pagination
}

export const initialState: EventState = {
  filter: {
    from: new Date(new Date().setHours(1,0,0,0)),
    to: new Date(new Date().setHours(24,59,0,0))
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

export function eventReducer (state: EventState | undefined, action: Action) {
    return reduce(state, action);
}

export const getFilters = (state: EventState) => state.filter;
export const getPagination = (state: EventState) => state.pagination;
