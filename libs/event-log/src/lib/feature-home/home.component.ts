import { Component, OnInit } from '@angular/core';
import { Filter } from '../+common/filters.model';
import { Observable } from 'rxjs';
import { EventLogsFacade } from '../+state/event-logs.facade';
import { EventPagedResponseVM } from '../view-models/eventPagedResponseVM';

@Component({
  selector: 'event-logs-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  eventsPagedResult$: Observable<EventPagedResponseVM> = this.eventLogFacade.eventLogs$;
  filters$: Observable<Filter>= this.eventLogFacade.filters$;

  pagination$ = this.eventLogFacade.pagination$;

  constructor(private eventLogFacade: EventLogsFacade) {
    
   }

  ngOnInit(): void { 
    this.eventLogFacade.getPagedResponse();
    this.filters$ = this.eventLogFacade.filters$;
  }

  changePage (newPage: number) {
    this.eventLogFacade.setPage(newPage);
  }

  changeFilters (event) {
    this.eventLogFacade.setFilter(event.dateFrom, event.dateTo, event.logLevels);
   }

}