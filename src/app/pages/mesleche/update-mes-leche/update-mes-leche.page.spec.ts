import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateMesLechePage } from './update-mes-leche.page';

describe('UpdateMesLechePage', () => {
  let component: UpdateMesLechePage;
  let fixture: ComponentFixture<UpdateMesLechePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UpdateMesLechePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
