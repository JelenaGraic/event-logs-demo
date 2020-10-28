import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../+state/index';
import { changePage } from '../+state/actions/filters.action';

@Component({
  selector: 'event-logs-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {

  @Input() events$;
  @Input() pageSize;
  @Input() page;
  activePage =1;
  @Input() totalNumber;
  @Output() onPageSelected: EventEmitter<number>;
  pages: number[];

  constructor(private store: Store<AppState>) {
    this.onPageSelected = new EventEmitter();
   }

  ngOnInit(): void {
    console.log(this.page); 
    console.log(this.totalNumber);

    this.pages = [];
    for (let i = 1; i <= this.getNoPages(); i++){
      this.pages.push(i);
    } 
  }

   getNoPages() :number{
     return Math.ceil(this.totalNumber/this.pageSize);
  }

  changePage(page: number) {
    this.store.dispatch(changePage({page}));
  }

  pageSelected (newPage: number) {
    if (newPage >=1 && newPage <= this.getNoPages()) {
      this.activePage = newPage;
      this.onPageSelected.emit(this.activePage);
    }
  }

}