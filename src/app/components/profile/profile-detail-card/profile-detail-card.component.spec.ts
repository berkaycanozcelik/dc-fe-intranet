import { ComponentFixture, TestBed } from '@angular/core/testing';

import ProfileDetailCardComponent from './profile-detail-card.component';

describe('ProfileDetailCardComponent', () => {
  let component: ProfileDetailCardComponent;
  let fixture: ComponentFixture<ProfileDetailCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProfileDetailCardComponent],
    });
    fixture = TestBed.createComponent(ProfileDetailCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
