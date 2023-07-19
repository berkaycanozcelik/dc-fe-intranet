import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileDetailUpdateCardComponent } from './profile-detail-update-card.component';

describe('ProfileDetailUpdateCardComponent', () => {
  let component: ProfileDetailUpdateCardComponent;
  let fixture: ComponentFixture<ProfileDetailUpdateCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProfileDetailUpdateCardComponent]
    });
    fixture = TestBed.createComponent(ProfileDetailUpdateCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
