import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteExtinguisherTableComponent } from './site-extinguisher-table.component';

describe('SiteExtinguisherTableComponent', () => {
  let component: SiteExtinguisherTableComponent;
  let fixture: ComponentFixture<SiteExtinguisherTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SiteExtinguisherTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiteExtinguisherTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
