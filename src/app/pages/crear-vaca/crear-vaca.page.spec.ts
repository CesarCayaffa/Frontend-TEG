import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearVacaPage } from './crear-vaca.page';

describe('CrearVacaPage', () => {
  let component: CrearVacaPage;
  let fixture: ComponentFixture<CrearVacaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CrearVacaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
