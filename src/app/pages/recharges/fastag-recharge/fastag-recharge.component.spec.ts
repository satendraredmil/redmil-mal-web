import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FastagRechargeComponent } from './fastag-recharge.component';

describe('FastagRechargeComponent', () => {
  let component: FastagRechargeComponent;
  let fixture: ComponentFixture<FastagRechargeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FastagRechargeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FastagRechargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
