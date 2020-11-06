import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'demo-ui-devices',
  templateUrl: './ui-devices.component.html',
  styleUrls: ['./ui-devices.component.scss']
})
export class UiDevicesComponent implements OnInit {
  displayedColumns: string[] = ['datetime', 'source', 'type', 'data'];
  

  @Input() eventLogs;
  

  constructor() { }

  ngOnInit(): void {
    
  }


}
