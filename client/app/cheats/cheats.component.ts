import { Validator } from 'codelyzer/walkerFactory/walkerFn';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

import { CheatService } from '../services/cheat.service';
import { ToastComponent } from '../shared/toast/toast.component';

@Component({
	selector: 'app-cheats',
	templateUrl: './cheats.component.html',
	styleUrls: ['./cheats.component.scss']
})
export class CheatsComponent implements OnInit {

	public cheat = {};
	cheats = [];
	cheaterNames = [];
	isLoading = true;
	isEditing = false;

	nameParam: string;
	private sub;
	selectedName = null;
	// addCheatForm: FormGroup;
	// title = new FormControl('', Validators.required);
	// code = new FormControl('', Validators.required);
	// description = new FormControl('', Validators.required);
	// name = new FormControl('', Validators.required);
	// updated_by = this.auth.currentUser.username;

	constructor(private cheatService: CheatService,
		// private formBuilder: FormBuilder,
		public toast: ToastComponent,
		private route: ActivatedRoute,
		private auth: AuthService,
		private router: Router) { }
	ngOnInit() {
		// this.addCheatForm = this.formBuilder.group({
		// 	title: this.title,
		// 	code: this.code,
		// 	description: this.description,
		// 	name: this.name,
		// 	updated_by: this.updated_by,
		// 	date_updated: new Date()
		// });
		this.sub = this.route.params.subscribe(params => {
			this.nameParam = params['name'];
			this.getCheatsWithParam(this.nameParam);
		});
		this.getNames();
	}

	getCheatsWithParam(param) {
		this.cheatService.getCheatsWithParam(param).subscribe(
			res => {
				this.cheats = res;
			},
			error => console.log(error),
			() => this.isLoading = false
		);
	}
	getCheats() {
		this.cheatService.getCheats().subscribe(
			res => {
				this.cheat = res;
				this.cheaterNames = res;
			},
			error => console.log(error),
			() => this.isLoading = false
		);
	}
	getNames() {
		this.cheatService.getNames().subscribe(
			data => this.cheaterNames = data,
			error => console.log(error)
		);
	}
	enableEditing(cheat) {
		this.isEditing = true;
		this.cheat = cheat;
	}

	cancelEditing() {
		this.isEditing = false;
		this.cheat = {};
		this.toast.setMessage('item editing cancelled.', 'warning');
		// reload the cheats to reset the editing
		this.getCheats();
	}

	editCheat(cheat) {
		if (!this.auth.loggedIn) {
			alert('not logged');
			this.router.navigate(['/login']);
		} else {
			this.cheatService.editCheat(cheat).subscribe(
				res => {
				this.isEditing = false;
				this.cheat = cheat;
				this.toast.setMessage('item edited successfully.', 'success');
			},
			error => console.log(error)
			);
		}
	}

	deleteCheat(cheat) {
		if (!this.auth.loggedIn) {
			this.router.navigate(['/login']);
		} else {
			if (window.confirm('Are you sure you want to permanently delete this item?')) {
				this.cheatService.deleteCheat(cheat).subscribe(
					res => {
						const pos = this.cheats.map(elem => elem._id).indexOf(cheat._id);
						this.cheats.splice(pos, 1);
						this.toast.setMessage('item deleted successfully.', 'success');
					},
					error => console.log(error)
				);
			}
		}
	}
}
