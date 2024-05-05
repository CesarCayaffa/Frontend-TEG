import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InfoPalpacionPage } from './info-palpacion.page';

describe('InfoPalpacionPage', () => {
  let component: InfoPalpacionPage;
  let fixture: ComponentFixture<InfoPalpacionPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(InfoPalpacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
