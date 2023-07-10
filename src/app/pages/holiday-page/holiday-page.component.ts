import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { HolidayFormComponent } from 'src/app/components/holiday-form/holiday-form.component';
import HolidayTableComponent from '../../components/holiday-table/holiday-table.component';
import { Holiday } from '../../models/holiday';
import { Observable } from 'rxjs';
import { HolidayService } from 'src/app/services/holiday/holiday.service';

@Component({
  selector: 'app-holiday',
  standalone: true,
  templateUrl: './holiday-page.component.html',
  styleUrls: ['./holiday-page.component.scss'],
  imports: [
    CommonModule,
    MatTabsModule,
    HolidayFormComponent,
    HolidayTableComponent,
  ],
})
export class HolidayComponent {
  constructor(private holidayService: HolidayService) {}

  holidays$: Observable<Holiday[]> = new Observable();

  holidays: Holiday[] = [];
  editHoliday!: Holiday;
  isEdit: boolean = false;

  onHolidaysChange(holiday: Holiday) {
    if (this.isEdit) {
      this.holidayService
        .updateHoliday(holiday, this.editHoliday.id!)
        .subscribe(
          (updatedHoliday) => {
            // Handle success, e.g., show a success message or update the holiday in the 'holidays' array
            console.log('Holiday updated successfully:', updatedHoliday);
            this.holidays = this.holidays.map((h) =>
              h.id === updatedHoliday.id ? updatedHoliday : h
            );
            this.isEdit = false;
          },
          (error) => {
            // Handle error, e.g., display an error message
            console.error('Error updating holiday:', error);
          }
        );
    } else {
      this.holidays.push(holiday);
    }
  }

  onEditHoliday(holiday: Holiday) {
    this.editHoliday = holiday;
    this.isEdit = true;
  }

  ngOnInit(): void {
    this.holidayService.getHolidays().subscribe((h) => {
      return (this.holidays = h);
    });
  }
}
