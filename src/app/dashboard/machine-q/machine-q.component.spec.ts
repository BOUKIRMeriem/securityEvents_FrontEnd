import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineQComponent } from './machine-q.component';

describe('MachineQComponent', () => {
  let component: MachineQComponent;
  let fixture: ComponentFixture<MachineQComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MachineQComponent]
    });
    fixture = TestBed.createComponent(MachineQComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
