import { createReducer, on, Action } from "@ngrx/store";
import { Filter } from '../../+common/filters.model';
import * as fromAcitions from '../actions/filters.action';


export interface FilterState {
  filter: Filter,
  page: number
}

export const initialState: FilterState = {
  filter: {
    dateFrom: null,
    dateTo: new Date(Date.now()),
    logLevels: null
  },
  page: 1
}

export const reduce = createReducer (
    initialState,
    on(fromAcitions.filterEvents,
      (state, action) => {
        return {
          ...state,
          filter: action.filters         
        }
      }
    ),
    on(fromAcitions.changePage,
      (state, action) => {
        return {
          ...state,
          page: action.page         
        }
      }
    )
)

export function eventReducer (state: FilterState | undefined, action: Action) {
    return reduce(state, action);
}

export const getFilters = (state: FilterState) => state.filter;
export const getPage = (state: FilterState) => state.page;
