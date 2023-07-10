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

  onHolidaysChange(holiday: Holiday) {
    this.holidays.push(holiday);
  }

  ngOnInit(): void {
    this.holidayService.getHolidays().subscribe((h) => {
      return (this.holidays = h);
    });
  }
}
