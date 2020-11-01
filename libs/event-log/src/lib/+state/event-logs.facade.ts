import { Injectable, OnDestroy } from '@angular/core';
import { EventService } from '@event-logs/data-access';
import { select, Store } from '@ngrx/store';
import * as fromEventLogs from './reducers/filters.reducer';
import * as EventLogsSelectors from './selectors/filters.selector';
import * as fromEventActions from './actions/filters.action';
import { Filter } from '../+common/filters.model';


@Injectable()
export class EventLogsFacade implements OnDestroy {

  filters$ = this.store.pipe(select(EventLogsSelectors.selectFilter));
  page;
  pageSub = this.store.pipe(select(EventLogsSelectors.selectPage)).subscribe(data => this.page = data);

  constructor(private store: Store<fromEventLogs.FilterState>, private service: EventService) {}

  getAll (page: number, pageSize: number, sort: string, sortDirection: string, filters?: Filter) {
    return this.service.getAll(page, pageSize, sort, sortDirection, filters);
  }
  
  changePage(page: number) {
    this.store.dispatch(fromEventActions.changePage({page}));
  }

  changeFilters(filters: Filter) {
    this.store.dispatch(fromEventActions.filterEvents({filters}));
  }

  ngOnDestroy() {
    this.pageSub.unsubscribe();
  }

}
