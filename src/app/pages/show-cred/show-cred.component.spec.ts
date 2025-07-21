import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCredComponent } from './show-cred.component';

describe('ShowCredComponent', () => {
  let component: ShowCredComponent;
  let fixture: ComponentFixture<ShowCredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowCredComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowCredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

