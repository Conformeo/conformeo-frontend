import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RgpdRequirementsComponent } from './rgpd-requirements.component';

describe('RgpdRequirementsComponent', () => {
  let component: RgpdRequirementsComponent;
  let fixture: ComponentFixture<RgpdRequirementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RgpdRequirementsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RgpdRequirementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
