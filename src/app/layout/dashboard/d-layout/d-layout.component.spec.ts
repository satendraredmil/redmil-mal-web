import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DLayoutComponent } from './d-layout.component';

describe('DLayoutComponent', () => {
  let component: DLayoutComponent;
  let fixture: ComponentFixture<DLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
