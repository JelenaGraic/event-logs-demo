import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'event-logs-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {

  @Input() events$;
  smt;

  constructor() { }

  ngOnInit(): void {

  }

}