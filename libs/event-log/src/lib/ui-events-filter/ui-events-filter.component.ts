import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Filter } from '../+common/filters.model';

@Component({
  selector: 'demo-ui-events-filter',
  templateUrl: './ui-events-filter.component.html',
  styleUrls: ['./ui-events-filter.component.scss']
})
export class UiEventsFilterComponent implements OnInit, OnDestroy {

   @Output() filterFields: EventEmitter<Filter>;
   @Input() filters$;
  filters: Subscription;


  filterForm = new FormGroup ({
    dateFrom: new FormControl(''),
    dateTo: new FormControl(''),
    logLevels: new FormControl('')
  });

  constructor(private fb: FormBuilder) {
    this.filterFields = new EventEmitter();
    this.createForm();
   }
 
   createForm() {
    this.filterForm = this.fb.group({
      dateFrom:'',
      dateTo: '',
      logLevels: 'all'
    })
  }
  

  ngOnInit(): void {
    this.filters = this.filters$.subscribe((res) => this.filterForm.patchValue(res));
  }

  sendFilter() {
    let filters: Filter = this.filterForm.value;
    this.filterFields.emit(filters);
  }
  
  ngOnDestroy() {
    this.filters.unsubscribe();
  }

}
