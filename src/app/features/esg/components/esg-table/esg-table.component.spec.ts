import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EsgTableComponent } from './esg-table.component';

describe('EsgTableComponent', () => {
  let component: EsgTableComponent;
  let fixture: ComponentFixture<EsgTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EsgTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EsgTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
