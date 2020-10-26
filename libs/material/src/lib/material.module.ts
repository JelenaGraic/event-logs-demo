import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';

@NgModule({
  imports: [
    CommonModule,
    MatDatepickerModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatNativeDateModule,
    MatSelectModule,
    MatButtonModule,
    ScrollingModule,
    MatDividerModule,
    MatListModule
  ],
  exports: [
    MatDatepickerModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatNativeDateModule,
    MatSelectModule,
    MatButtonModule,
    ScrollingModule,
    MatDividerModule,
    MatListModule
  ]
})
export class MaterialModule {}
