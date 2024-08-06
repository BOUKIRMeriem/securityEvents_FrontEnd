import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineAComponent } from './machine-a.component';

describe('MachineAComponent', () => {
  let component: MachineAComponent;
  let fixture: ComponentFixture<MachineAComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MachineAComponent]
    });
    fixture = TestBed.createComponent(MachineAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
