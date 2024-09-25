import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutRechargeComponent } from './layout-recharge.component';

describe('LayoutRechargeComponent', () => {
  let component: LayoutRechargeComponent;
  let fixture: ComponentFixture<LayoutRechargeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutRechargeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutRechargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
