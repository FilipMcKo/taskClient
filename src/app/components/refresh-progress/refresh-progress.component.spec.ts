import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefreshProgressComponent } from './refresh-progress.component';

describe('RefreshProgressComponent', () => {
  let component: RefreshProgressComponent;
  let fixture: ComponentFixture<RefreshProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefreshProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefreshProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
