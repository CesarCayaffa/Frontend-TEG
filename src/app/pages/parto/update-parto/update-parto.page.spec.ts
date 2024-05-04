import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdatePartoPage } from './update-parto.page';

describe('UpdatePartoPage', () => {
  let component: UpdatePartoPage;
  let fixture: ComponentFixture<UpdatePartoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UpdatePartoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
