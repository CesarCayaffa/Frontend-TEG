import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InfoMesLechePage } from './info-mes-leche.page';

describe('InfoMesLechePage', () => {
  let component: InfoMesLechePage;
  let fixture: ComponentFixture<InfoMesLechePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(InfoMesLechePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
