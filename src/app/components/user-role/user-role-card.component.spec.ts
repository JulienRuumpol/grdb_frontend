import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRoleCardComponent } from './user-role-card.component';

describe('UserRoleComponent', () => {
  let component: UserRoleCardComponent;
  let fixture: ComponentFixture<UserRoleCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserRoleCardComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UserRoleCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
