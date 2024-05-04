import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddPalpacionPage } from './add-palpacion.page';

describe('AddPalpacionPage', () => {
  let component: AddPalpacionPage;
  let fixture: ComponentFixture<AddPalpacionPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddPalpacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
