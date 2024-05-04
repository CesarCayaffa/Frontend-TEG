import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddPartoPage } from './add-parto.page';

describe('AddPartoPage', () => {
  let component: AddPartoPage;
  let fixture: ComponentFixture<AddPartoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddPartoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
