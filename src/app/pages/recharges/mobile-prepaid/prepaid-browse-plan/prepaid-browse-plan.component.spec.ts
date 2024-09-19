import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrepaidBrowsePlanComponent } from './prepaid-browse-plan.component';

describe('PrepaidBrowsePlanComponent', () => {
  let component: PrepaidBrowsePlanComponent;
  let fixture: ComponentFixture<PrepaidBrowsePlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrepaidBrowsePlanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrepaidBrowsePlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
