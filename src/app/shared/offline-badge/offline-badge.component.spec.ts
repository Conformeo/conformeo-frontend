import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfflineBadgeComponent } from './offline-badge.component';

describe('OfflineBadgeComponent', () => {
  let component: OfflineBadgeComponent;
  let fixture: ComponentFixture<OfflineBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OfflineBadgeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfflineBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
