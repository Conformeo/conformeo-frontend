import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteDetailPageComponent } from './site-detail-page.component';

describe('SiteDetailPageComponent', () => {
  let component: SiteDetailPageComponent;
  let fixture: ComponentFixture<SiteDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SiteDetailPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiteDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
