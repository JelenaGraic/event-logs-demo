import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../+state/index';
import { Observable } from 'rxjs';
import { EventPagedResponse } from '../../../../data-access/src/lib/eventPagedResponse';

@Component({
  selector: 'event-logs-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit, OnDestroy {

  @Input() result$: Observable<EventPagedResponse>;
  @Input() pageSize;

  activePage =1;
  totalNumber;
  @Output() onPageSelected: EventEmitter<number>;
  @Output() page: EventEmitter<number>;
  pages: number[];
  //totalNumberSub = Subscription;

  constructor(private store: Store<AppState>) {
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
    this.result$.subscribe((res) => this.totalNumber = res.totalNumber);  
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

  ngOnDestroy(){

  }

}