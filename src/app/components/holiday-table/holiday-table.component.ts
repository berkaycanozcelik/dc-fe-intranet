import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Pfingsten', weight: 3, symbol: 'Accepted' },
  { position: 2, name: 'Silvester', weight: 2, symbol: 'Accepted' },
  { position: 3, name: 'Ostern', weight: 6, symbol: 'Accepted' },
];

@Component({
  selector: 'app-holiday-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatChipsModule],
  templateUrl: './holiday-table.component.html',
  styleUrls: ['./holiday-table.component.scss'],
})
export class HolidayTableComponent {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
}
