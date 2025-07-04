import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingListItemComponent } from './training-list-item.component';

describe('TrainingListItemComponent', () => {
  let component: TrainingListItemComponent;
  let fixture: ComponentFixture<TrainingListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainingListItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainingListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
