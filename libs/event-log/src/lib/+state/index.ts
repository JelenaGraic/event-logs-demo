import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromFiltersReducer from './reducers/filters.reducer';


export const appStateFeatureKey = 'appState';

export interface AppState {
   filters: fromFiltersReducer.FilterState   
}

export const reducers: ActionReducerMap <AppState> = {
    filters: fromFiltersReducer.reduce               
}

export const selectAppState = createFeatureSelector<AppState>(
    appStateFeatureKey
);