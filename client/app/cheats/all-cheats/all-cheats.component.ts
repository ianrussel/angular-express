import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../shared/common/common.service';
import { Subscription } from 'rxjs/Subscription';

import { CheatService } from '../../services/cheat.service';

@Component({
    selector: 'app-all-cheats',
    templateUrl: './all-cheats.component.html',
    styleUrls: ['./all-cheats.component.scss']
})
export class AllCheatsComponent implements OnInit {

    public 	cheaterNames = [];
    constructor(private cheatService: CheatService, private commonService: CommonService) { }

    ngOnInit() {
        this.getNames();
    }

    getNames() {
		this.cheatService.getNames().subscribe(
			res => {
				this.cheaterNames = res;
                this.commonService.notifyOther({option: 'onHomeLoad', value: this.cheaterNames});
			},
			error => console.log(error)
		);
	}
}
