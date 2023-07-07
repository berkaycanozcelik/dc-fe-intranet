import { ComponentFixture, TestBed } from '@angular/core/testing';

import HolidayTableComponent from './holiday-table.component';

describe('HolidayTableComponent', () => {
  let component: HolidayTableComponent;
  let fixture: ComponentFixture<HolidayTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HolidayTableComponent],
    });
    fixture = TestBed.createComponent(HolidayTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
