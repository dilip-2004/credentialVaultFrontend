import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCredComponent } from './update-cred.component';

describe('UpdateCredComponent', () => {
  let component: UpdateCredComponent;
  let fixture: ComponentFixture<UpdateCredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateCredComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateCredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

