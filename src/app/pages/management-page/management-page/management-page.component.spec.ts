import { ComponentFixture, TestBed } from '@angular/core/testing';

import ManagementPageComponent from './management-page.component';

describe('ManagementPageComponent', () => {
  let component: ManagementPageComponent;
  let fixture: ComponentFixture<ManagementPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ManagementPageComponent],
    });
    fixture = TestBed.createComponent(ManagementPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
