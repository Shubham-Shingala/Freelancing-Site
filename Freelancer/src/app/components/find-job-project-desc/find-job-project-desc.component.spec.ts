import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindJobProjectDescComponent } from './find-job-project-desc.component';

describe('FindJobProjectDescComponent', () => {
  let component: FindJobProjectDescComponent;
  let fixture: ComponentFixture<FindJobProjectDescComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindJobProjectDescComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FindJobProjectDescComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
