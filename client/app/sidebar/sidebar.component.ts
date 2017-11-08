import { Component, OnInit } from '@angular/core';
import { CommonService } from '../shared/common/common.service';
import { Subscription } from 'rxjs/Subscription';

import { CheatService } from '../services/cheat.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    cheaterNames = [];
    private subscription: Subscription;
	constructor(private commonService: CommonService, private cheatService: CheatService) { }

	ngOnInit() {
        this.subscription = this.commonService.notifyObservable$.subscribe((res) => {
        	if (res.hasOwnProperty('option') && res.option === 'onHomeLoad') {
        		console.log(res.value, 'i am from sidebar');
        		this.cheaterNames = res.value;
        	}
        })
        this.subscription = this.commonService.notifyObservable$.subscribe((res) => {
        	if (res.hasOwnProperty('option') && res.option === 'onDeleteCheat') {
        		console.log('one cheat deleted');
        		this.getNames();
        	}
        })
	}
    getNames() {
		this.cheatService.getNames().subscribe(
			res => {
				this.cheaterNames = res;
				console.log(this.cheaterNames, 'from about');
			},
			error => console.log(error)
		);
	}
}
