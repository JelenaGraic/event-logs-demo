import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromEventsReducer from './reducers/events.reducer';


export const appStateFeatureKey = 'appState';

export interface AppState {
   events: fromEventsReducer.EventState   
}

export const reducers: ActionReducerMap <AppState> = {
    events: fromEventsReducer.reduce               
}

export const selectAppState = createFeatureSelector<AppState>(
    appStateFeatureKey
);