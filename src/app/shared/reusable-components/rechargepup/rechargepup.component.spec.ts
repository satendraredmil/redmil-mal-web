import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechargepupComponent } from './rechargepup.component';

describe('RechargepupComponent', () => {
  let component: RechargepupComponent;
  let fixture: ComponentFixture<RechargepupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RechargepupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RechargepupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
