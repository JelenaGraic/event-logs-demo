import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { EventLogPagedResponseVM } from '../view-models/eventPagedResponseVM';

@Component({
  selector: 'event-logs-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventListComponent implements OnInit {

  @Input() eventsPagedResult: EventLogPagedResponseVM;
  @Input() pagination;

   @Output() onPageSelected: EventEmitter<number>;
   
   pages: number[];

   activePage =1;

  constructor() {
     this.onPageSelected = new EventEmitter();
   }

  ngOnInit(): void {
    this.pages = [];
    for (let i = 1; i <= this.getNoPages(); i++){
      this.pages.push(i);
    }
       
  }

   getNoPages(): number {    
    return Math.ceil(this.eventsPagedResult.totalNumber/this.pagination.pageSize) ;
  }

  pageSelected (newPage: number) {
    if (newPage >=1 && newPage <= this.getNoPages()) {
      this.activePage = newPage;
      this.onPageSelected.emit(this.activePage);
    }
  }

}