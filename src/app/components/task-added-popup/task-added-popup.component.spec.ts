import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskAddedPopupComponent } from './task-added-popup.component';

describe('TaskAddedPopupComponent', () => {
  let component: TaskAddedPopupComponent;
  let fixture: ComponentFixture<TaskAddedPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskAddedPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskAddedPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
