import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewGameComponent } from './add-new-game.component';

describe('AddNewGameComponent', () => {
  let component: AddNewGameComponent;
  let fixture: ComponentFixture<AddNewGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNewGameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
