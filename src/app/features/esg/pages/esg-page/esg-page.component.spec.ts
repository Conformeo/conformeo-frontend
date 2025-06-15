import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EsgPageComponent } from './esg-page.component';

describe('EsgPageComponent', () => {
  let component: EsgPageComponent;
  let fixture: ComponentFixture<EsgPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EsgPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EsgPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
