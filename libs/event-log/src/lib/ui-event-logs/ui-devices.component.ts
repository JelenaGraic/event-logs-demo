import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'demo-ui-event-logs',
  templateUrl: './ui-devices.component.html',
  styleUrls: ['./ui-devices.component.scss']
})
export class UiEventLogsComponent implements OnInit {
  displayedColumns: string[] = ['datetime', 'source', 'type', 'data'];
  

  @Input() eventLogs;
  

  constructor() { }

  ngOnInit(): void {
    
  }

}
