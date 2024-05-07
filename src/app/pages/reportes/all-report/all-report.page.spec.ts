import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AllReportPage } from './all-report.page';

describe('AllReportPage', () => {
  let component: AllReportPage;
  let fixture: ComponentFixture<AllReportPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AllReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
