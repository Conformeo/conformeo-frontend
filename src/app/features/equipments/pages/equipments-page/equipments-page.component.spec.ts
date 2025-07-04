import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentsPageComponent } from './equipments-page.component';

describe('EquipmentsPageComponent', () => {
  let component: EquipmentsPageComponent;
  let fixture: ComponentFixture<EquipmentsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EquipmentsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipmentsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
