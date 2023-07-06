import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { HolidayFormComponent } from 'src/app/components/holiday-form/holiday-form.component';
import { HolidayTableComponent } from "../../components/holiday-table/holiday-table.component";

@Component({
    selector: 'app-holiday',
    standalone: true,
    templateUrl: './holiday.component.html',
    styleUrls: ['./holiday.component.scss'],
    imports: [CommonModule, MatTabsModule, HolidayFormComponent, HolidayTableComponent]
})
export class HolidayComponent {}
