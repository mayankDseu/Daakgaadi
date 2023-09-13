import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackestComponent } from './packest.component';

describe('PackestComponent', () => {
  let component: PackestComponent;
  let fixture: ComponentFixture<PackestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PackestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
