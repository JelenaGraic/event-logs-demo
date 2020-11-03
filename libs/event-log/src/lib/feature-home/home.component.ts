import { Component, OnInit } from '@angular/core';
import { Filter } from '../+common/filters.model';
import { Observable } from 'rxjs';
import { EventLogsFacade } from '../+state/event-logs.facade';
import { EventPagedResponseVM } from '../view-models/eventPagedResponseVM';
import { EventVM } from '../view-models/eventVM';

@Component({
  selector: 'event-logs-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  eventResult$: Observable<EventVM[]> = this.eventLogFacade.eventLogs$;
  filters$: Observable<Filter>;

  // page: number;
  // pageSize= 5;
  // filters: Filter;
  // sort = "name";
  // sortDirection = "asc";

  dateFrom;
  dateTo;
  logLevels;

  constructor(private eventLogFacade: EventLogsFacade) {
    
   }

  ngOnInit(): void {
    // this.filters$ = this.eventLogFacade.filters$;
    // this.page = this.eventLogFacade.page;   
    // this.refresh(); 
    this.eventLogFacade.getAll();
  }

  // refresh() {
  //   this.eventResult$ = this.eventLogFacade.getAll(this.page, this.pageSize, this.sort, this.sortDirection, this.filters);
  // }

  // changePage (newPage: number) {
  //   this.page = newPage;
  //   this.refresh();
  //   this.eventLogFacade.changePage(newPage);
  // }

  // changeFilters (event) {
  //   this.eventLogFacade.changeFilters(event);
  //   this.filters = event;
  // }

  // putNewPage(page: number) {
  //   this.eventLogFacade.changePage(page);
  // }

}