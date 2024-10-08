import { ComponentFixture, TestBed } from '@angular/core/testing';

import {EntityComponent } from './entity.component';

describe('MachineAComponent', () => {
  let component: EntityComponent;
  let fixture: ComponentFixture<EntityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EntityComponent]
    });
    fixture = TestBed.createComponent(EntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
