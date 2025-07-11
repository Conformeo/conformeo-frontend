import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RgpdProcedureComponent } from './rgpd-procedure.component';

describe('RgpdProcedureComponent', () => {
  let component: RgpdProcedureComponent;
  let fixture: ComponentFixture<RgpdProcedureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RgpdProcedureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RgpdProcedureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
