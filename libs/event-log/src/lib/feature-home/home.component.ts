import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EventService } from '@event-logs/data-access';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AppState } from '../+state/index';
import { select, Store } from '@ngrx/store';
import * as fromAction from '../+state/actions/filters.action';
import { Filter } from '../+common/filters.model';
import { selectFilter, selectPage } from '../+state/selectors/filters.selector';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'event-logs-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  filterForm = new FormGroup ({
    dateFrom: new FormControl(''),
    dateTo: new FormControl(''),
    allLogLevels: new FormControl('')
  });

  result;
  filters$: Observable<Filter>;
  totalNumber: number;
  filters: Subscription;

  params = {
    "page": 1,
    "pageSize": 5,
    "logLevel": this.filterForm.controls['allLogLevels'].value,
    "from": this.filterForm.controls['dateFrom'].value,
    "to": this.filterForm.controls['dateTo'].value,
    "sort": "name",
    "sortDirection": "asc"
  }

  constructor(private service: EventService, private fb: FormBuilder, private store: Store<AppState>) {
    this.createForm();
   }

   createForm() {
     this.filterForm = this.fb.group({
       dateFrom:'',
       dateTo: '',
       allLogLevels: 'all'
     })
   }

  ngOnInit(): void {
    this.filters$ = this.store.pipe(select(selectFilter));
    this.filters = this.filters$.subscribe((res) => this.filterForm.patchValue(res));
    this.store.pipe(select(selectPage)).subscribe(data => this.params.page = data);    
    this.refresh(); 
  }

  refresh() {
    this.service.getAll(this.params).subscribe(
      data => {
        this.result = data.events,
        this.totalNumber = data.totalNumber
        
      }
    )
  }

  addFilter (){
    if (this.filterForm.controls['dateFrom'].value > this.filterForm.controls['dateTo'].value || 
        this.filterForm.controls['dateFrom'].value === this.filterForm.controls['dateTo'].value) {
      console.log("out of scope...")
    } else {
      this.store.dispatch(fromAction.filterEvents({filters: this.filterForm.value})); 
    }   
  }

  changePage (newPage: number) {
    this.params.page = newPage;
    this.refresh();
    this.store.dispatch(fromAction.changePage({page: newPage}))
  }

  ngOnDestroy() {
    this.filters.unsubscribe();
  }
}