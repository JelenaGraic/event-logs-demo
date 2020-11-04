import { Injectable, OnDestroy } from '@angular/core';
import { EventService } from '@event-logs/data-access';
import { select, Store } from '@ngrx/store';
import * as fromEventLogs from './reducers/filters.reducer';
import * as EventLogsSelectors from './selectors/filters.selector';
import * as fromEventActions from './actions/filters.action';
import { EventLogLevel } from '../+common/filters.model';
import { EventPagedResponseVM } from '../view-models/eventPagedResponseVM';
import { BehaviorSubject, Observable, pipe} from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { combineLatest } from 'rxjs';

const initialValues: EventPagedResponseVM = {
  events: [],
  page: 0,
  pageSize: 0,
  totalNumber: 0,
  sort: '',
  sortDirection: '',
  dateFrom: null,
  dateTo: null,
  logLevels: ''
};


@Injectable()
export class EventLogsFacade 
{

  private eventLogsSubject = new BehaviorSubject<EventPagedResponseVM>(initialValues);
  eventLogs$ = this.eventLogsSubject.asObservable();

  pagination$ = this.filterStore.pipe(select(EventLogsSelectors.selectPages));
  filters$ = this.filterStore.pipe(select(EventLogsSelectors.selectFilter));  
  sort$ = this.filterStore.pipe(select(EventLogsSelectors.selectSort));

  constructor(private filterStore: Store<fromEventLogs.FilterState>, private eventService: EventService) {

      // combineLatest([this.filters$, this.pagination$, this.sort$]).pipe(map([filter, pagination, sort]) => {
      // })
  }

  getPagedResponse (page= 1, size= 5, sortField= "name", sortDirection= "asc", dateFrom= null, 
                    dateTo = new Date(Date.now()), logLevels= '') {  

      this.eventService.getPagedResponse(page, size, sortField, sortDirection, dateFrom, dateTo, logLevels).subscribe(
        data => this.eventLogsSubject.next(data));
  }

  setPage(page?: number, pageSize=5) {
    this.filterStore.dispatch(fromEventActions.applyPagination({pagination: {page: page, pageSize: pageSize}}))
  }

  setFilter(dateFrom: Date, dateTo: Date, logLevels: EventLogLevel) {
    this.filterStore.dispatch(fromEventActions.applyFilter({filters: {dateFrom: dateFrom, dateTo: dateTo, logLevels: logLevels} }))
  }

  setSort(sortField: string, sortDirection: string) {
    this.filterStore.dispatch(fromEventActions.applySort({sort: {sortField: sortField, sortDirection: sortDirection}}))
  }

}
