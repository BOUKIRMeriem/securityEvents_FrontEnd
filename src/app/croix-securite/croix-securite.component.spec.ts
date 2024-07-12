import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CroixSecuriteComponent } from './croix-securite.component';

describe('CroixSecuriteComponent', () => {
  let component: CroixSecuriteComponent;
  let fixture: ComponentFixture<CroixSecuriteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CroixSecuriteComponent]
    });
    fixture = TestBed.createComponent(CroixSecuriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
