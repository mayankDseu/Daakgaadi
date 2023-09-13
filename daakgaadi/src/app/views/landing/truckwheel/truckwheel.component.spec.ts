import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TruckwheelComponent } from './truckwheel.component';

describe('TruckwheelComponent', () => {
  let component: TruckwheelComponent;
  let fixture: ComponentFixture<TruckwheelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TruckwheelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TruckwheelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
