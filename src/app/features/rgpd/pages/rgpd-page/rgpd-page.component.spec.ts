import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RgpdPageComponent } from './rgpd-page.component';

describe('RgpdPageComponent', () => {
  let component: RgpdPageComponent;
  let fixture: ComponentFixture<RgpdPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RgpdPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RgpdPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
