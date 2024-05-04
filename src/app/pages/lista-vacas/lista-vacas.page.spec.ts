import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaVacasPage } from './lista-vacas.page';

describe('ListaVacasPage', () => {
  let component: ListaVacasPage;
  let fixture: ComponentFixture<ListaVacasPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ListaVacasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
