import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorPopupsComponent } from './error-popups.component';

describe('ErrorPopupsComponent', () => {
  let component: ErrorPopupsComponent;
  let fixture: ComponentFixture<ErrorPopupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorPopupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorPopupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
