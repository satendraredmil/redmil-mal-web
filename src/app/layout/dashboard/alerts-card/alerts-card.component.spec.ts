import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertsCardComponent } from './alerts-card.component';

describe('AlertsCardComponent', () => {
  let component: AlertsCardComponent;
  let fixture: ComponentFixture<AlertsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertsCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
