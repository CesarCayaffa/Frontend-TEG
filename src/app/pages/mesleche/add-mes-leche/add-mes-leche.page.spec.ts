import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddMesLechePage } from './add-mes-leche.page';

describe('AddMesLechePage', () => {
  let component: AddMesLechePage;
  let fixture: ComponentFixture<AddMesLechePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddMesLechePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
