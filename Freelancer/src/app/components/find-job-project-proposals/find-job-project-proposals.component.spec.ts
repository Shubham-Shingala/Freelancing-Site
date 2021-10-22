import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindJobProjectProposalsComponent } from './find-job-project-proposals.component';

describe('FindJobProjectProposalsComponent', () => {
  let component: FindJobProjectProposalsComponent;
  let fixture: ComponentFixture<FindJobProjectProposalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindJobProjectProposalsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FindJobProjectProposalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
