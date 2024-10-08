import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobilePrepaidComponent } from './mobile-prepaid.component';

describe('MobilePrepaidComponent', () => {
  let component: MobilePrepaidComponent;
  let fixture: ComponentFixture<MobilePrepaidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobilePrepaidComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobilePrepaidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
