import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { EventLogPagedResponseDto, EventLogService } from '@event-logs/data-access';
import { select, Store } from '@ngrx/store';
import * as fromEventLogs from '../+state/reducers/events.reducer';
import * as EventLogsSelectors from '../+state/selectors/events.selector';
import * as fromEventActions from '../+state/actions/events.action';
import { BehaviorSubject, Observable, pipe, Subscription} from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { EventLogVM } from '../view-models/eventLogVM';
import { EventLogPagedResponseVM } from '../view-models/eventPagedResponseVM';

const initialValues: EventLogPagedResponseVM = {
  events: [],
  page: 0,
  pageSize: 0,
  totalNumber: 0,
  from: null,
  to: null
};


@Injectable()
export class EventLogsFacade implements OnInit, OnDestroy
{
   private subscriptions: Subscription[] = [];

  // private eventLogsSubject = new BehaviorSubject<EventPagedResponseVM>(initialValues);
  // eventLogs$ = this.eventLogsSubject.asObservable();

   pagination$ = this.eventStore.pipe(select(EventLogsSelectors.selectPages));
   filters$ = this.eventStore.pipe(select(EventLogsSelectors.selectFilter));  

  private DevicesSubject = new BehaviorSubject<EventLogPagedResponseVM>(initialValues);
  allDevices$ = this.DevicesSubject.asObservable();
  private SemanticsSubject = new BehaviorSubject<EventLogPagedResponseVM>(initialValues);
  allSemantics$ = this.SemanticsSubject.asObservable();

  constructor(private eventStore: Store<fromEventLogs.EventState>, private eventLogService: EventLogService) {

    const eventsSubscription = combineLatest([this.filters$, this.pagination$]).pipe(
      switchMap(([filter, pagination]) => {
        return this.eventLogService.getPagedResponse(pagination.page, pagination.pageSize, filter.from, filter.to).pipe(
          tap(data => {

            const devicesList: EventLogPagedResponseVM = {page:pagination.page, pageSize: pagination.pageSize, from: filter.from,
            to: filter.to, events: [], totalNumber: 100};
            const semanticList: EventLogPagedResponseVM = {page:pagination.page, pageSize: pagination.pageSize, from: filter.from,
              to: filter.to, events: [], totalNumber: 100};

            for (let i = 0; i<data.eventLogs.length; i++) {
              if(data.eventLogs[i].originType === 'DEVICE'){
                let device = new EventLogVM(data.eventLogs[i]);
                devicesList.events.push(device);               
              } else {
                let semantic = new EventLogVM(data.eventLogs[i]);
                semanticList.events.push(semantic);   
              }
            }
            this.DevicesSubject.next(devicesList);
            this.SemanticsSubject.next(semanticList);
          })
        )
      })
    ).subscribe();


    //  this.eventLogService.getAll().subscribe(data => {
    //   const devicesList: EventLogVM[] = [];
    //   const semanticList: EventLogVM[] = [];
    //   for (let i = 0; i<data.length; i++){
    //     if (data[i].originType === 'DEVICE') {
    //       let dev = new EventLogVM(data[i]);       
    //       devicesList.push(dev);      
    //     } else {
    //       let sem = new EventLogVM(data[i]);
    //       semanticList.push(sem);
    //     }
    //   }     
    //   this.DevicesSubject.next(devicesList);
    //   this.SemanticsSubject.next(semanticList);        
        
    // });

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
