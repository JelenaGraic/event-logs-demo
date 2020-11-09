import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventLogPagedResponseDto } from '@event-logs/data-access';
import { Observable } from 'rxjs';
import { Filter } from '../+common/filters.model';
import { EventLogVM } from '../view-models/eventLogVM';
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
  

  eventLogs$: Observable<EventLogPagedResponseVM>;
  filters$: Observable<Filter>= this.eventLogFacade.filters$;
  

  constructor(private eventLogFacade: EventLogsFacade, private route: ActivatedRoute) {
    let paramType = this.route.snapshot.paramMap.get('type');
    let paramId = this.route.snapshot.paramMap.get('id');
    if (paramType === 'devices' && Number(paramId)===12345){
      this.eventLogs$ = this.eventLogFacade.allDevices$;
    } else {
      this.eventLogs$ = this.eventLogFacade.allSemantics$;
    }
    
   }

  ngOnInit(): void {

  }

}
