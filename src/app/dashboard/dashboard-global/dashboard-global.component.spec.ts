import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardGlobalComponent } from './dashboard-global.component';

describe('DashboardGlobalComponent', () => {
  let component: DashboardGlobalComponent;
  let fixture: ComponentFixture<DashboardGlobalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardGlobalComponent]
    });
    fixture = TestBed.createComponent(DashboardGlobalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
