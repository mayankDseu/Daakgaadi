import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwowheelComponent } from './twowheel.component';

describe('TwowheelComponent', () => {
  let component: TwowheelComponent;
  let fixture: ComponentFixture<TwowheelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TwowheelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TwowheelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
