import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { EventPagedResponseVM } from '../+state/view-models/eventPagedResponseVM';

@Component({
  selector: 'event-logs-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventListComponent implements OnInit {

  @Input() result$: Observable<EventPagedResponseVM>;
  @Input() pageSize;
  @Input() totalNumber;

  @Output() onPageSelected: EventEmitter<number>;
  @Output() page: EventEmitter<number>;
  pages: number[];
  totalNumberSub = Subscription;

  activePage =1;

  constructor() {
    this.onPageSelected = new EventEmitter();
    this.page = new EventEmitter();
   }

  ngOnInit(): void {
    this.pages = [];
    for (let i = 1; i <= this.getNoPages(); i++){
      this.pages.push(i);
    } 
  }

   getNoPages(): number {
    return Math.ceil(this.totalNumber/this.pageSize) ;
    
    
  }

  changePage(newPage: number) {
    this.page.emit(newPage);
  }

  pageSelected (newPage: number) {
    if (newPage >=1 && newPage <= this.getNoPages()) {
      this.activePage = newPage;
      this.onPageSelected.emit(this.activePage);
    }
  }

}