import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatCalendarCellClassFunction,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Holiday } from '../../models/holiday';
import { HolidayService } from 'src/app/services/holiday/holiday.service';

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
export class HolidayFormComponent implements OnInit {
  constructor(private holidayService: HolidayService) {}

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    // Only highligh dates inside the month view.
    if (view === 'month') {
      const date = cellDate.getDate();

      // Highlight the 1st and 20th day of each month.
      return date === 1 || date === 20 ? 'example-custom-date-class' : '';
    }

    return '';
  };
  @Output() holidayChange = new EventEmitter<Holiday>();
  @Input() editHoliday!: Holiday;
  @Input() isEditMode: boolean = false;

  startDate: string = '';
  endDate: string = '';
  vacationWorkdays: number = 0;
  reason: string = '';
  confirmation1: boolean = false;
  confirmation2: boolean = false;
  replacement: string = '';
  status: string = 'Pending';

  ngOnInit() {
    if (this.isEditMode) {
      this.startDate = this.editHoliday.startDate;
      this.endDate = this.editHoliday.endDate;
      this.vacationWorkdays = this.editHoliday.vacationWorkdays;
      this.reason = this.editHoliday.reason;
      this.confirmation1 = this.editHoliday.confirmation1;
      this.confirmation2 = this.editHoliday.confirmation2;
      this.replacement = this.editHoliday.replacement;
      this.status = this.editHoliday.status;
    }
  }

  submitForm() {
    if (!this.isEditMode) {
      const holiday: Holiday = {
        startDate: this.startDate,
        endDate: this.endDate,
        vacationWorkdays: this.vacationWorkdays,
        reason: this.reason,
        confirmation1: this.confirmation1,
        confirmation2: this.confirmation2,
        replacement: this.replacement,
        status: this.status,
      };

      this.holidayService.saveHoliday(holiday).subscribe(
        (response) => {
          console.log('Sucessfully saved holiday: ' + response);
        },
        (error) => {
          // Handle error if log
          console.log('Error by saving holiday: ' + error);
        }
      );
      this.holidayChange.emit(holiday);
    } else {
      const holiday: Holiday = {
        startDate: this.startDate,
        endDate: this.endDate,
        vacationWorkdays: this.vacationWorkdays,
        reason: this.reason,
        confirmation1: this.confirmation1,
        confirmation2: this.confirmation2,
        replacement: this.replacement,
        status: this.status,
      };

      this.holidayChange.emit(holiday);
    }

    this.resetForm();
  }

  resetForm() {
    this.startDate = '';
    this.endDate = '';
    this.vacationWorkdays = 0;
    this.reason = '';
    this.confirmation1 = false;
    this.confirmation2 = false;
    this.replacement = '';
    this.status = 'Pending';
  }
}
