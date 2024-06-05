import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyListComponentComponent } from './party-list-component.component';

describe('PartyListComponentComponent', () => {
  let component: PartyListComponentComponent;
  let fixture: ComponentFixture<PartyListComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartyListComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartyListComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
