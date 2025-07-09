import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingRgpdComponent } from './landing-rgpd.component';

describe('LandingRgpdComponent', () => {
  let component: LandingRgpdComponent;
  let fixture: ComponentFixture<LandingRgpdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingRgpdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingRgpdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
