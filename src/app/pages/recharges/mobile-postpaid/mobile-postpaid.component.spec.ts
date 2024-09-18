import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobilePostpaidComponent } from './mobile-postpaid.component';

describe('MobilePostpaidComponent', () => {
  let component: MobilePostpaidComponent;
  let fixture: ComponentFixture<MobilePostpaidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobilePostpaidComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobilePostpaidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
