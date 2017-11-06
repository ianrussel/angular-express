import { Component, OnInit } from '@angular/core';

import { CheatService } from '../services/cheat.service';
@Component({
	selector: 'app-about',
	templateUrl: './about.component.html'
})
export class AboutComponent implements OnInit {
	cheaterNames = [];
	constructor(private cheatService: CheatService) { }

	ngOnInit() {
		this.getNames();
	}

	getNames() {
		this.cheatService.getNames().subscribe(
			res => {
				this.cheaterNames = res;
				console.log('from about');
			},
			error => console.log(error)
		);
	}

}
