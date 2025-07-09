import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RgpdHistoryComponent } from './rgpd-history.component';

describe('RgpdHistoryComponent', () => {
  let component: RgpdHistoryComponent;
  let fixture: ComponentFixture<RgpdHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RgpdHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RgpdHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
