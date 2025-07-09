import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RgpdCreateComponent } from './rgpd-create.component';

describe('RgpdCreateComponent', () => {
  let component: RgpdCreateComponent;
  let fixture: ComponentFixture<RgpdCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RgpdCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RgpdCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
