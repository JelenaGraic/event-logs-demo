import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Filter } from '../+common/filters.model';

@Component({
  selector: 'demo-ui-events-filter',
  templateUrl: './ui-events-filter.component.html',
  styleUrls: ['./ui-events-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UiEventsFilterComponent implements OnInit {

  @Output() newFilters: EventEmitter<Filter>;
   @Input() filters;


  filterForm = new FormGroup ({
    dateFrom: new FormControl(''),
    dateTo: new FormControl(''),
    logLevels: new FormControl('')
  });

  constructor(private fb: FormBuilder) {
    this.newFilters = new EventEmitter();
    this.createForm();
   }
 
   createForm() {
    this.filterForm = this.fb.group({
      dateFrom:'',
      dateTo: '',
      logLevels: ''
    })
  }
  

   ngOnInit(): void {
      this.filterForm.patchValue(this.filters);
   }

   sendFilter() {
    this.newFilters.emit(this.filterForm.value);
   }

}
