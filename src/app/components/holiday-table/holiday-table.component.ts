import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { Holiday } from '../../models/holiday';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { HolidayService } from 'src/app/services/holiday/holiday.service';
import { Router, RouterModule } from '@angular/router';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-holiday-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatChipsModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    RouterModule,
  ],
  templateUrl: './holiday-table.component.html',
  styleUrls: ['./holiday-table.component.scss'],
})
export default class HolidayTableComponent {
  constructor(private holidayService: HolidayService, private router: Router) {}

  @Output() editHoliday = new EventEmitter<Holiday>();

  @Input() holidays: Holiday[] = [];

  onEdit(i: number): void {
    // this.holidayService.editHolidayById(i,this.holidays[i])
    this.editHoliday.emit(this.holidays[i]);
    this.router.navigate(['/holiday']);
  }

  onDelete(i: number): void {
    let deleteHoliday = this.holidays[i];
    this.holidayService.deleteHoliday(deleteHoliday.id!).subscribe(
      () => {
        // Find the index of the holiday to delete
        const index = this.holidays.findIndex(
          (h) => h.id === deleteHoliday.id!
        );
        if (index !== -1) {
          // Splice the holiday from the array
          this.holidays.splice(index, 1);
          console.log('Holiday deleted successfully:', deleteHoliday.id!);
        }
      },
      (error) => {
        console.error('Error deleting holiday:', error);
      }
    );
  }
}
