import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './feature-home/home.component';
import { EventListComponent } from './ui-event-list/event-list.component';
import { DataAccessModule } from '@event-logs/data-access';
import { MaterialModule } from '@event-logs/material';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { reducers } from './+state/index';

@NgModule({
  imports: [
    CommonModule, 
    DataAccessModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature('appState', reducers)
  ],
  declarations: [HomeComponent, EventListComponent],
  exports: [HomeComponent, EventListComponent, HttpClientModule,FormsModule, ReactiveFormsModule],
})
export class EventLogModule {}
