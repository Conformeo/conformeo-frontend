import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KitTableComponent } from './kit-table.component';

describe('KitTableComponent', () => {
  let component: KitTableComponent;
  let fixture: ComponentFixture<KitTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KitTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KitTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
