import { Component, OnInit } from '@angular/core';

import { AuthService } from './services/auth.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component1.html'
})
export class AppComponent1 implements OnInit {

	constructor(public auth: AuthService) { }

	ngOnInit() {
	}
}
