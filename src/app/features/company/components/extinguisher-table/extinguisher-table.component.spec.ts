import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtinguisherTableComponent } from './extinguisher-table.component';

describe('ExtinguisherTableComponent', () => {
  let component: ExtinguisherTableComponent;
  let fixture: ComponentFixture<ExtinguisherTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExtinguisherTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExtinguisherTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
