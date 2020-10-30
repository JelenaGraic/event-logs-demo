import { Injectable } from '@angular/core';
import { EventService } from '@event-logs/data-access';

import { select, Store, Action } from '@ngrx/store';

import * as fromEventLogs from './reducers/filters.reducer';
import * as EventLogsSelectors from './selectors/filters.selector';
import { Filter } from '../+common/filters.model';

@Injectable()
export class EventLogsFacade {

  constructor(private store: Store<fromEventLogs.FilterState>, private service: EventService) {}

  dispatch(action: Action) {
    this.store.dispatch(action);
  }

  getAll (page: number, pageSize: number, sort: string, sortDirection: string, filters?: Filter) {
    return this.service.getAll(page, pageSize, sort, sortDirection, filters);
  }
  

}
