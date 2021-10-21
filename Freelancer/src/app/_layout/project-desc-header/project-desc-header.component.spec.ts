import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDescHeaderComponent } from './project-desc-header.component';

describe('ProjectDescHeaderComponent', () => {
  let component: ProjectDescHeaderComponent;
  let fixture: ComponentFixture<ProjectDescHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectDescHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectDescHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
