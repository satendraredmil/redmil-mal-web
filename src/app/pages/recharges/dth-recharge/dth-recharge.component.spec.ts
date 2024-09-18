import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DthRechargeComponent } from './dth-recharge.component';

describe('DthRechargeComponent', () => {
  let component: DthRechargeComponent;
  let fixture: ComponentFixture<DthRechargeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DthRechargeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DthRechargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
