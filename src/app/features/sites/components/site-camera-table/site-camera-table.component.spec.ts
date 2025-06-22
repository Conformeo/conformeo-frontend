import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteCameraTableComponent } from './site-camera-table.component';

describe('SiteCameraTableComponent', () => {
  let component: SiteCameraTableComponent;
  let fixture: ComponentFixture<SiteCameraTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SiteCameraTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiteCameraTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
