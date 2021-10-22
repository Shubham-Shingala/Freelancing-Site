import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindJobProjectHeaderComponent } from './find-job-project-header.component';

describe('FindJobProjectHeaderComponent', () => {
  let component: FindJobProjectHeaderComponent;
  let fixture: ComponentFixture<FindJobProjectHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindJobProjectHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FindJobProjectHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
