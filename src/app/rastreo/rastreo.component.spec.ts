import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RastreoComponent } from './rastreo.component';

describe('RastreoComponent', () => {
  let component: RastreoComponent;
  let fixture: ComponentFixture<RastreoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RastreoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RastreoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
