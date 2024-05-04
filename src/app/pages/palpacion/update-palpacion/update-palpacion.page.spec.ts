import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdatePalpacionPage } from './update-palpacion.page';

describe('UpdatePalpacionPage', () => {
  let component: UpdatePalpacionPage;
  let fixture: ComponentFixture<UpdatePalpacionPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UpdatePalpacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
