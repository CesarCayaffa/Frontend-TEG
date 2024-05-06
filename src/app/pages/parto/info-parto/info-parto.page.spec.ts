import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InfoPartoPage } from './info-parto.page';

describe('InfoPartoPage', () => {
  let component: InfoPartoPage;
  let fixture: ComponentFixture<InfoPartoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(InfoPartoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
