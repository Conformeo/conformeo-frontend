import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RgpdScoreComponent } from './rgpd-score.component';

describe('RgpdScoreComponent', () => {
  let component: RgpdScoreComponent;
  let fixture: ComponentFixture<RgpdScoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RgpdScoreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RgpdScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
