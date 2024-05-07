import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InfoCondicionesPage } from './info-condiciones.page';

describe('InfoCondicionesPage', () => {
  let component: InfoCondicionesPage;
  let fixture: ComponentFixture<InfoCondicionesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(InfoCondicionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
