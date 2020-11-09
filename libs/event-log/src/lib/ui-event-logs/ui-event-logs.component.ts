import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { EventLogVM } from '../view-models/eventLogVM';
import { EventLogsFacade } from './event-logs.facade';


@Component({
  selector: 'demo-ui-event-logs',
  templateUrl: './ui-event-logs.component.html',
  styleUrls: ['./ui-event-logs.component.scss'],
  providers: [EventLogsFacade]
})
export class UiEventLogsComponent implements OnInit {
  displayedColumns: string[] = ['datetime', 'source', 'type', 'data'];
  

  eventLogs$: Observable<EventLogVM[]>;
  

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
