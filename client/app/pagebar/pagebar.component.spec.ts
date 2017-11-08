import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagebarComponent } from './pagebar.component';

describe('PagebarComponent', () => {
  let component: PagebarComponent;
  let fixture: ComponentFixture<PagebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
