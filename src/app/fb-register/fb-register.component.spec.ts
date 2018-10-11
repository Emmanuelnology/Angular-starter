import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FbRegisterComponent } from './fb-register.component';

describe('FbRegisterComponent', () => {
  let component: FbRegisterComponent;
  let fixture: ComponentFixture<FbRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FbRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FbRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
