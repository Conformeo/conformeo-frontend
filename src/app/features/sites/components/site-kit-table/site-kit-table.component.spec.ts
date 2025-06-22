import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteKitTableComponent } from './site-kit-table.component';

describe('SiteKitTableComponent', () => {
  let component: SiteKitTableComponent;
  let fixture: ComponentFixture<SiteKitTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SiteKitTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiteKitTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
