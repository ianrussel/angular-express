import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

import { CheatService } from './services/cheat.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
	cheaterNames = [];
	constructor(public auth: AuthService, private cheatService: CheatService) { }

	ngOnInit() {
		this.getNames();
	}
	getNames() {
		this.cheatService.getNames().subscribe(
			res => {
				this.cheaterNames = res;
			},
			error => console.log(error)
		);
	}
}
