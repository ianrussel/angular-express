import { Validator } from 'codelyzer/walkerFactory/walkerFn';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { CheatService } from '../services/cheat.service';
import { ToastComponent } from '../shared/toast/toast.component';

@Component({
	selector: 'app-cheats',
	templateUrl: './cheats.component.html',
	styleUrls: ['./cheats.component.scss']
})
export class CheatsComponent implements OnInit {

	cheat = {};
	cheats = [];
	cheaterNames = [];
	isLoading = true;
	isEditing = false;

	options: string[] = ['United States', 'Australia', 'Canada', 'Brazil', 'England'];

	selectedName = null;
	addCheatForm: FormGroup;
	title = new FormControl('', Validators.required);
	code = new FormControl('', Validators.required);
	description = new FormControl('', Validators.required);
	name = new FormControl('', Validators.required);

	constructor(private cheatService: CheatService,
		private formBuilder: FormBuilder,
		public toast: ToastComponent) { }

	ngOnInit() {
		this.getCheats();
		this.getNames();
		this.addCheatForm = this.formBuilder.group({
			title: this.title,
			code: this.code,
			description: this.description,
			name: this.name
		});
	}

	getCheats() {
		this.cheatService.getCheats().subscribe(
			res => {
				this.cheats = res;
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
	addCheat() {
		this.cheatService.addCheat(this.addCheatForm.value).subscribe(
			res => {
				const newCheat = res.json();
				this.cheats.push(newCheat);
				this.addCheatForm.reset();
				this.toast.setMessage('item added successfully.', 'success');
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
		this.cheatService.editCheat(cheat).subscribe(
			res => {
			this.isEditing = false;
			this.cheat = cheat;
			this.toast.setMessage('item edited successfully.', 'success');
		},
		error => console.log(error)
		);
	}

	deleteCheat(cheat) {
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
