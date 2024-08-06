import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbordQualityComponent } from './dashbord-quality.component';

describe('DashbordQualityComponent', () => {
  let component: DashbordQualityComponent;
  let fixture: ComponentFixture<DashbordQualityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashbordQualityComponent]
    });
    fixture = TestBed.createComponent(DashbordQualityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
