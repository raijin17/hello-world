import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HighstaffComponent } from './highstaff.component';

describe('HighstaffComponent', () => {
  let component: HighstaffComponent;
  let fixture: ComponentFixture<HighstaffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HighstaffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HighstaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
