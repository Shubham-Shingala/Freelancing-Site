import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreelancerProjectsComponent } from './freelancer-projects.component';

describe('FreelancerProjectsComponent', () => {
  let component: FreelancerProjectsComponent;
  let fixture: ComponentFixture<FreelancerProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FreelancerProjectsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FreelancerProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
