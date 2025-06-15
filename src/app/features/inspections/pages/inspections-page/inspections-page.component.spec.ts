import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionsPageComponent } from './inspections-page.component';

describe('InspectionsPageComponent', () => {
  let component: InspectionsPageComponent;
  let fixture: ComponentFixture<InspectionsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InspectionsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InspectionsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
