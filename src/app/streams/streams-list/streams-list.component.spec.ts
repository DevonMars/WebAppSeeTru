import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamsListComponent } from './streams-list.component';

describe('StreamsListComponent', () => {
  let component: StreamsListComponent;
  let fixture: ComponentFixture<StreamsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StreamsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StreamsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
