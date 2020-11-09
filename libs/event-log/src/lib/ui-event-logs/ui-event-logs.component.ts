import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Filter } from '../+common/filters.model';
import { Pagination } from '../+common/pagination.model';
import { EventLogPagedResponseVM } from '../view-models/eventPagedResponseVM';
import { EventLogsFacade } from './event-logs.facade';


@Component({
  selector: 'demo-ui-event-logs',
  templateUrl: './ui-event-logs.component.html',
  styleUrls: ['./ui-event-logs.component.scss'],
  providers: [EventLogsFacade]
})
export class UiEventLogsComponent implements OnInit {
  displayedColumns: string[] = ['datetime', 'source', 'type', 'data'];
  
  vm$: Observable<{eventLogs: EventLogPagedResponseVM, filters: Filter, pagination: Pagination}>

  eventLogs$: Observable<EventLogPagedResponseVM>;
  filters$: Observable<Filter>= this.eventLogFacade.filters$;
  pagination$: Observable<Pagination> = this.eventLogFacade.pagination$;
  

  constructor(private eventLogFacade: EventLogsFacade, private route: ActivatedRoute) {
    let paramType = this.route.snapshot.paramMap.get('type');
    let paramId = this.route.snapshot.paramMap.get('id');

    if (paramType === 'devices' && Number(paramId)===12345){
      this.eventLogs$ = this.eventLogFacade.allDevices$;
      
    } else {
      this.eventLogs$ = this.eventLogFacade.allSemantics$;
    }

    this.vm$ = combineLatest([this.eventLogs$, this.filters$, this.pagination$]).pipe(
      map(([eventLogs, filters, pagination]) => {
        return { eventLogs, filters, pagination}
      })
    )
    
  }

  ngOnInit(): void {
  }

  applyFilters(event: Filter){
    this.eventLogFacade.setFilter(event)
  }

  onPageChange(event) {
    console.log(event);
    this.eventLogFacade.setPage(event.pageIndex+1);
  }

}