import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DthBrowseplanComponent } from './dth-browseplan.component';

describe('DthBrowseplanComponent', () => {
  let component: DthBrowseplanComponent;
  let fixture: ComponentFixture<DthBrowseplanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DthBrowseplanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DthBrowseplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
