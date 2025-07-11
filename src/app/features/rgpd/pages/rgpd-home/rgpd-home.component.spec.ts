import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RgpdHomeComponent } from './rgpd-home.component';

describe('RgpdHomeComponent', () => {
  let component: RgpdHomeComponent;
  let fixture: ComponentFixture<RgpdHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RgpdHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RgpdHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
