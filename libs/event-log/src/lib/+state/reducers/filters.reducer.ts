import { createReducer, on, Action } from "@ngrx/store";
import { Filter } from '../../+common/filters.model';
import * as fromAcitions from '../actions/filters.action';

export interface FilterState {
  filter: Filter
}

export const initialState: FilterState = {
  filter: {
    dateFrom: null,
    dateTo: new Date(Date.now()),
    logLavels: 'all'
  }

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
    )
)

export function eventReducer (state: FilterState | undefined, action: Action) {
    return reduce(state, action);
}

export const getFilters = (state: FilterState) => state.filter;