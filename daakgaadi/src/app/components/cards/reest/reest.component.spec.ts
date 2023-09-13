import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReestComponent } from './reest.component';

describe('ReestComponent', () => {
  let component: ReestComponent;
  let fixture: ComponentFixture<ReestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
