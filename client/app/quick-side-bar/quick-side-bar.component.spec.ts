import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickSideBarComponent } from './quick-side-bar.component';

describe('QuickSideBarComponent', () => {
    let component: QuickSideBarComponent;
    let fixture: ComponentFixture<QuickSideBarComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ QuickSideBarComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(QuickSideBarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
