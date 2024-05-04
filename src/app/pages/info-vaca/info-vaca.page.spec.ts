import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InfoVacaPage } from './info-vaca.page';

describe('InfoVacaPage', () => {
  let component: InfoVacaPage;
  let fixture: ComponentFixture<InfoVacaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(InfoVacaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
