import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DFooterComponent } from './d-footer.component';

describe('DFooterComponent', () => {
  let component: DFooterComponent;
  let fixture: ComponentFixture<DFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DFooterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
