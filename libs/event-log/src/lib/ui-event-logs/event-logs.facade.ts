import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { EventLogService } from '@event-logs/data-access';
import { select, Store } from '@ngrx/store';
import * as fromEventLogs from '../+state/reducers/filters.reducer';
import * as EventLogsSelectors from '../+state/selectors/filters.selector';
import * as fromEventActions from '../+state/actions/filters.action';
import { BehaviorSubject, Observable, pipe, Subscription} from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { EventLogVM } from '../view-models/eventLogVM';

// const initialValues: EventPagedResponseVM = {
//   events: [],
//   page: 0,
//   pageSize: 0,
//   totalNumber: 0,
//   sort: '',
//   sortDirection: '',
//   dateFrom: null,
//   dateTo: null,
//   logLevels: null
// };


@Injectable()
export class EventLogsFacade implements OnInit, OnDestroy
{
   private subscriptions: Subscription[] = [];

  // private eventLogsSubject = new BehaviorSubject<EventPagedResponseVM>(initialValues);
  // eventLogs$ = this.eventLogsSubject.asObservable();

  // pagination$ = this.filterStore.pipe(select(EventLogsSelectors.selectPages));
  // filters$ = this.filterStore.pipe(select(EventLogsSelectors.selectFilter));  
  // sort$ = this.filterStore.pipe(select(EventLogsSelectors.selectSort));

  private DevicesSubject = new BehaviorSubject<EventLogVM[]>([]);
  allDevices$ = this.DevicesSubject.asObservable();
  private SemanticsSubject = new BehaviorSubject<EventLogVM[]>([]);
  allSemantics$ = this.SemanticsSubject.asObservable();

  constructor(private filterStore: Store<fromEventLogs.FilterState>, private eventLogService: EventLogService) {

    
    const eventsSubscription = this.eventLogService.getAll().subscribe(data => {
      const devicesList: EventLogVM[] = [];
      const semanticList: EventLogVM[] = [];
      for (let i = 0; i<data.length; i++){
        if (data[i].originType === 'DEVICE') {
          let dev = new EventLogVM(data[i]);       
          devicesList.push(dev);      
        } else {
          let sem = new EventLogVM(data[i]);
          semanticList.push(sem);
        }
      }     
      this.DevicesSubject.next(devicesList);
      this.SemanticsSubject.next(semanticList);        
        
    });

    // const querySubscription = combineLatest([this.filters$, this.pagination$, this.sort$]).pipe(
    //   switchMap(([filter, pagination, sort]) => {
    //     return this.eventService.getPagedResponse(pagination.page, pagination.pageSize, sort.sortField, sort.sortDirection, filter.dateFrom, filter.dateTo, filter.logLevels).pipe(
    //       tap(data => {
    //         this.eventLogsSubject.next(data)})
    //     )
    //   })
    // ).subscribe();

     this.subscriptions.push(eventsSubscription);
      
  }

  ngOnInit() {}

  // setPage(page?: number, pageSize=5) {
  //   this.filterStore.dispatch(fromEventActions.applyPagination({pagination: {page: page, pageSize: pageSize}}))
  // }

  // setFilter(dateFrom: Date, dateTo: Date, logLevels: EventLogLevel) {
  //   this.filterStore.dispatch(fromEventActions.applyFilter({filters: {dateFrom: dateFrom, dateTo: dateTo, logLevels: logLevels} }))
  // }

  // setSort(sortField: string, sortDirection: string) {
  //   this.filterStore.dispatch(fromEventActions.applySort({sort: {sortField: sortField, sortDirection: sortDirection}}))
  // }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
    this.subscriptions = [];
  }

}
