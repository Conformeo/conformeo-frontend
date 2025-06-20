import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteTableComponent } from './site-table.component';

describe('SiteTableComponent', () => {
  let component: SiteTableComponent;
  let fixture: ComponentFixture<SiteTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SiteTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiteTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
