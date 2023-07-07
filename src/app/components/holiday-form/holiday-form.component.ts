import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatCalendarCellClassFunction,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { Holiday } from '../../models/holiday';

@Component({
  selector: 'app-holiday-form',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
  ],
  templateUrl: './holiday-form.component.html',
  styleUrls: ['./holiday-form.component.scss'],
})
export class HolidayFormComponent {
  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    // Only highligh dates inside the month view.
    if (view === 'month') {
      const date = cellDate.getDate();

      // Highlight the 1st and 20th day of each month.
      return date === 1 || date === 20 ? 'example-custom-date-class' : '';
    }

    return '';
  };

  @Output() holidaysChange = new EventEmitter<Holiday[]>();

  startDate: string = '';
  endDate: string = '';
  remainingDays: number = 0;
  vacationWorkdays: number = 0;
  reason: string = '';
  confirmation1: boolean = false;
  confirmation2: boolean = false;
  replacement: string = '';
  status: string = 'Pending';
  holidays: Holiday[] = [];

  submitForm() {
    const holiday: Holiday = {
      startDate: this.startDate,
      endDate: this.endDate,
      remainingDays: this.remainingDays,
      vacationWorkdays: this.vacationWorkdays,
      reason: this.reason,
      confirmation1: this.confirmation1,
      confirmation2: this.confirmation2,
      replacement: this.replacement,
      status: this.status,
    };

    this.holidays.push(holiday);
    this.resetForm();
    console.log('Form submitted. Holidays:', this.holidays);
    this.holidaysChange.emit(this.holidays);
  }

  resetForm() {
    this.startDate = '';
    this.endDate = '';
    this.remainingDays = 0;
    this.vacationWorkdays = 0;
    this.reason = '';
    this.confirmation1 = false;
    this.confirmation2 = false;
    this.replacement = '';
    this.status = 'Pending';
  }
}
