import { Validator } from 'codelyzer/walkerFactory/walkerFn';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

import { CheatService } from '../services/cheat.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { CommonService} from '../shared/common/common.service';

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

	constructor(private cheatService: CheatService,
		public toast: ToastComponent,
		private route: ActivatedRoute,
		private auth: AuthService,
		private router: Router,
		private commonService: CommonService) { }
	ngOnInit() {
		this.sub = this.route.params.subscribe(params => {
			this.nameParam = params['name'];
			this.getCheatsWithParam(this.nameParam);
		});
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
			res => {
				this.cheaterNames = res;
			},
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
			if(this.auth.currentUser.role !== 'admin') {
				this.toast.setMessage('Oops you are not permitted because your role is insufficient', 'warning');
				return false;
			}
			if (window.confirm('Are you sure you want to permanently delete this item?')) {
				this.cheatService.deleteCheat(cheat).subscribe(
					res => {
						const pos = this.cheats.map(elem => elem._id).indexOf(cheat._id);
						this.cheats.splice(pos, 1);
						this.toast.setMessage('item deleted successfully.', 'success');
						this.commonService.notifyOther({option: 'onDeleteCheat'});
					},
					error => console.log(error)
				);
			}
		}
	}
}
