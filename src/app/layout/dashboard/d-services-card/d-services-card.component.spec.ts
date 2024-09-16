import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DServicesCardComponent } from './d-services-card.component';

describe('DServicesCardComponent', () => {
  let component: DServicesCardComponent;
  let fixture: ComponentFixture<DServicesCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DServicesCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DServicesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
