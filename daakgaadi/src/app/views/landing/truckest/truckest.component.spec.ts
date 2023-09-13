import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TruckestComponent } from './truckest.component';

describe('TruckestComponent', () => {
  let component: TruckestComponent;
  let fixture: ComponentFixture<TruckestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TruckestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TruckestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
