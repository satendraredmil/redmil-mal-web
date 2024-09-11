import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DMenuCardComponent } from './d-menu-card.component';

describe('DMenuCardComponent', () => {
  let component: DMenuCardComponent;
  let fixture: ComponentFixture<DMenuCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DMenuCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DMenuCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
