import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbordAvailabilityComponent } from './dashbord-availability.component';

describe('DashbordAvailabilityComponent', () => {
  let component: DashbordAvailabilityComponent;
  let fixture: ComponentFixture<DashbordAvailabilityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashbordAvailabilityComponent]
    });
    fixture = TestBed.createComponent(DashbordAvailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
