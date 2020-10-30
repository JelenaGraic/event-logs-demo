import { Component, OnDestroy, OnInit } from '@angular/core';
import { EventService } from '@event-logs/data-access';
import { AppState } from '../+state/index';
import { select, Store } from '@ngrx/store';
import * as fromAction from '../+state/actions/filters.action';
import { Filter } from '../+common/filters.model';
import { selectFilter, selectPage } from '../+state/selectors/filters.selector';
import { Observable, Subscription } from 'rxjs';
import { EventLogsFacade } from '../+state/event-logs.facade';

@Component({
  selector: 'event-logs-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  eventResult$;
  totalNumber: number;
  filters$: Observable<Filter>;

  eventListSub: Subscription;
  pageSub: Subscription;

  page: number;
  pageSize= 5;
  filters: Filter;
  sort = "name";
  sortDirection = "asc";

  dateFrom;
  dateTo;
  logLevels;

  constructor(private service: EventService, private store: Store<AppState>, private eventLogFacade: EventLogsFacade) {

   }

  ngOnInit(): void {
    this.filters$ = this.store.pipe(select(selectFilter));
    this.pageSub = this.store.pipe(select(selectPage)).subscribe(data => this.page = data);    
    this.refresh(); 
  }

  refresh() {
    this.eventResult$ = this.eventLogFacade.getAll(this.page, this.pageSize, this.sort, this.sortDirection, this.filters);
  }

  changePage (newPage: number) {
    this.page = newPage;
    this.refresh();
    this.store.dispatch(fromAction.changePage({page: newPage}))
  }

  ngOnDestroy() {
    this.eventListSub.unsubscribe();
    this.pageSub.unsubscribe();
  }

  changeFilters (event) {
    this.store.dispatch(fromAction.filterEvents({filters: event})); 
    this.filters = event;
  }
}