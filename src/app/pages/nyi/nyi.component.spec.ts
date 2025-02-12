import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NyiComponent } from './nyi.component';

describe('NyiComponent', () => {
  let component: NyiComponent;
  let fixture: ComponentFixture<NyiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NyiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NyiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
