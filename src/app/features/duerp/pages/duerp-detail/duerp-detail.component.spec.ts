import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuerpDetailComponent } from './duerp-detail.component';

describe('DuerpDetailComponent', () => {
  let component: DuerpDetailComponent;
  let fixture: ComponentFixture<DuerpDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DuerpDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DuerpDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
