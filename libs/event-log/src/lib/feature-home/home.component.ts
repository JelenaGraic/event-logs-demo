import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EventService } from '@event-logs/data-access';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AppState } from '../+state/index';
import { select, Store } from '@ngrx/store';
import * as fromAction from '../+state/actions/filters.action';
import { Filter } from '../+common/filters.model';
import { selectFilter } from '../+state/selectors/filters.selector';
import { Observable } from 'rxjs';

@Component({
  selector: 'event-logs-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  filterForm = new FormGroup ({
    dateFrom: new FormControl(''),
    dateTo: new FormControl(''),
    allLogLevels: new FormControl('')
  });

  events$;
  filters$: Observable<Filter>;

  params = {
    "page": "0",
    "pageSize": "10",
    "logLavel": this.filterForm.controls['allLogLevels'].value,
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
    this.events$ = this.service.events$;
    this.filters$ = this.store.pipe(select(selectFilter));
    this.filters$.subscribe((res) => this.filterForm.patchValue(res));
  }

  addFilter (){
    if (this.filterForm.controls['dateFrom'].value > this.filterForm.controls['dateTo'].value || 
        this.filterForm.controls['dateFrom'].value === this.filterForm.controls['dateTo'].value) {
      console.log("out of scope...")
    } else {
      this.store.dispatch(fromAction.filterEvents({filters: this.filterForm.value})); 
    }   
  }
}
