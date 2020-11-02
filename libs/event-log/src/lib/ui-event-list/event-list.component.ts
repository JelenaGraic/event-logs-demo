import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Subscription } from 'rxjs';
import { EventPagedResponseVM } from '../view-models/eventPagedResponseVM';
import { EventVM } from '../view-models/eventVM';

@Component({
  selector: 'event-logs-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventListComponent implements OnInit {

  @Input() result: EventVM[];
  //@Input() pageSize;

  //@Output() onPageSelected: EventEmitter<number>;
  //@Output() page: EventEmitter<number>;
  //pages: number[];

  activePage =1;

  constructor() {
    // this.onPageSelected = new EventEmitter();
    // this.page = new EventEmitter();
   }

  ngOnInit(): void {
    // this.pages = [];
    // for (let i = 1; i <= this.getNoPages(); i++){
    //   this.pages.push(i);
    // } 
  }

  //  getNoPages(): number {
  //   return Math.ceil(this.result.totalNumber/this.pageSize) ;
    
    
  // }

  // changePage(newPage: number) {
  //   this.page.emit(newPage);
  // }

  // pageSelected (newPage: number) {
  //   if (newPage >=1 && newPage <= this.getNoPages()) {
  //     this.activePage = newPage;
  //     this.onPageSelected.emit(this.activePage);
  //   }
  // }

}