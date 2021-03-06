import { Component, OnInit } from '@angular/core';
import { Filter } from '../+common/filters.model';
import { combineLatest, Observable } from 'rxjs';
import { HomeFacade } from './home.facade';
import { EventPagedResponseVM } from '../view-models/eventPagedResponseVM';
import { map } from 'rxjs/operators';
import { Pagination } from '../+common/pagination.model';

@Component({
  selector: 'event-logs-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [HomeFacade]
})
export class HomeComponent implements OnInit {

  vm$: Observable<{eventsPagedResult: EventPagedResponseVM, filters: Filter, pagination: Pagination}>;

  eventsPagedResult$: Observable<EventPagedResponseVM> = this.eventLogFacade.eventLogs$;
  filters$: Observable<Filter>= this.eventLogFacade.filters$;
  pagination$ = this.eventLogFacade.pagination$;

  constructor(private eventLogFacade: HomeFacade) {

    this.vm$ = combineLatest([this.eventsPagedResult$, this.filters$, this.pagination$]).pipe(
      map(([eventsPagedResult, filters, pagination])=> {
        return { eventsPagedResult, filters, pagination }
      }))
    
   }

  ngOnInit(): void { 
  }

  changePage (newPage: number) {
    this.eventLogFacade.setPage(newPage);
  }

  changeFilters (event) {
    this.eventLogFacade.setFilter(event.dateFrom, event.dateTo, event.logLevels);
   }

}