import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActualizarVacaPage } from './actualizar-vaca.page';

describe('ActualizarVacaPage', () => {
  let component: ActualizarVacaPage;
  let fixture: ComponentFixture<ActualizarVacaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ActualizarVacaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
