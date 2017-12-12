import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCheatsComponent } from './all-cheats.component';

describe('AllCheatsComponent', () => {
  let component: AllCheatsComponent;
  let fixture: ComponentFixture<AllCheatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [ AllCheatsComponent ]
    })
    .compileComponents();
  }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AllCheatsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
