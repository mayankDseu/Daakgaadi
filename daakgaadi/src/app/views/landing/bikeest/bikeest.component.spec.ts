import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BikeestComponent } from './bikeest.component';

describe('BikeestComponent', () => {
  let component: BikeestComponent;
  let fixture: ComponentFixture<BikeestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BikeestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BikeestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
