import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCredComponent } from './add-cred.component';

describe('AddCredComponent', () => {
  let component: AddCredComponent;
  let fixture: ComponentFixture<AddCredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCredComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

