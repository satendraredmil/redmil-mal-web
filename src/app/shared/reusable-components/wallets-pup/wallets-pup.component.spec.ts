import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletsPupComponent } from './wallets-pup.component';

describe('WalletsPupComponent', () => {
  let component: WalletsPupComponent;
  let fixture: ComponentFixture<WalletsPupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WalletsPupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WalletsPupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
