import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { EventLogService } from '@event-logs/data-access';
import { select, Store } from '@ngrx/store';
import * as fromEventLogs from '../+state/reducers/events.reducer';
import * as EventLogsSelectors from '../+state/selectors/events.selector';
import * as fromEventActions from '../+state/actions/events.action';
import { BehaviorSubject, Subscription} from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { EventLogVM } from '../view-models/eventLogVM';
import { EventLogPagedResponseVM } from '../view-models/eventPagedResponseVM';
import { Filter } from '../+common/filters.model';

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
            to: filter.to, events: [], totalNumber: 0};
            const semanticList: EventLogPagedResponseVM = {page:pagination.page, pageSize: pagination.pageSize, from: filter.from,
              to: filter.to, events: [], totalNumber: 0};

            for (let i = 0; i<data.eventLogs.length; i++) {
              if(data.eventLogs[i].originType === 'DEVICE'){
                let device = new EventLogVM(data.eventLogs[i]);
                devicesList.events.push(device); 
                devicesList.totalNumber = devicesList.events.length;              
              } else {
                let semantic = new EventLogVM(data.eventLogs[i]);
                semanticList.events.push(semantic);
                semanticList.totalNumber = semanticList.events.length;  
              }
            }
            this.DevicesSubject.next(devicesList);
            this.SemanticsSubject.next(semanticList);
          })
        )
      })
    ).subscribe();

     this.subscriptions.push(eventsSubscription);
      
  }

  ngOnInit() {}

  // setPage(page?: number, pageSize=5) {
  //   this.filterStore.dispatch(fromEventActions.applyPagination({pagination: {page: page, pageSize: pageSize}}))
  // }

  setFilter(filters: Filter) {
    this.eventStore.dispatch(fromEventActions.applyFilter(
      {filters: {from: new Date(new Date(filters.from).setHours(1,0,0,0)), to: new Date(new Date(filters.to).setHours(24,59,0,0))} }))
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
    this.subscriptions = [];
  }

}
