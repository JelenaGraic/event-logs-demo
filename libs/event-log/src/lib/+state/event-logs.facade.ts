import { Injectable, OnDestroy } from '@angular/core';
import { EventService } from '@event-logs/data-access';
import { select, Store } from '@ngrx/store';
import * as fromEventLogs from './reducers/filters.reducer';
import * as EventLogsSelectors from './selectors/filters.selector';
import * as fromEventActions from './actions/filters.action';
import { Filter } from '../+common/filters.model';
import { EventPagedResponseVM } from '../view-models/eventPagedResponseVM';
import { BehaviorSubject, Observable, pipe } from 'rxjs';
import { EventVM } from '../view-models/eventVM';
import { map, tap } from 'rxjs/operators';


@Injectable()
export class EventLogsFacade //implements OnDestroy 
{

  private result = new BehaviorSubject<EventVM[]>([]);
  eventResponse$ = this.result.asObservable(); 

  // filters$ = this.filterStore.pipe(select(EventLogsSelectors.selectFilter));
  // page;
  // pageSub = this.filterStore.pipe(select(EventLogsSelectors.selectPage)).subscribe(data => this.page = data);

 

  constructor(private filterStore: Store<fromEventLogs.FilterState>, private eventService: EventService) {

  }

  getAll (
    //page: number, pageSize: number, sort: string, sortDirection: string, filters?: Filter
    ) {
      
       this.eventService.getAll().subscribe(data => this.result.next(data))
            
    //  return this.eventService.getAll(
       //page, pageSize, sort, sortDirection, filters
      //  );
  }
  
  // changePage(page: number) {
  //   this.filterStore.dispatch(fromEventActions.changePage({page}));
  // }

  // changeFilters(filters: Filter) {
  //   this.filterStore.dispatch(fromEventActions.filterEvents({filters}));
  // }

  // ngOnDestroy() {
  //   this.pageSub.unsubscribe();
  // }

}
