import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MangingComponent } from './manging.component';

describe('MangingComponent', () => {
  let component: MangingComponent;
  let fixture: ComponentFixture<MangingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MangingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MangingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
