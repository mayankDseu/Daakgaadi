import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfsideComponent } from './profside.component';

describe('ProfsideComponent', () => {
  let component: ProfsideComponent;
  let fixture: ComponentFixture<ProfsideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfsideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
