import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastComponent } from '../shared/toast/toast.component';
import { Router } from '@angular/router';
import { CheatService } from '../services/cheat.service';
import { AuthService } from '../services/auth.service';
@Component({
	selector: 'app-new',
	templateUrl: './add.component.html'
})

export class AddComponent implements OnInit {
	isEditing = false;
	public cheats = [];
	public cheaterNames = [];
	public selectedName = null;
	addCheatForm: FormGroup;
	title = new FormControl('', Validators.required);
	code = new FormControl('', Validators.required);
	description = new FormControl('', Validators.required);
	name = new FormControl('', Validators.required);
	created_by = this.auth.currentUser.username;

	constructor(
		private cheatService: CheatService,
		private formBuilder: FormBuilder,
		private router: Router,
		public toast: ToastComponent,
		private auth: AuthService ) {}

	ngOnInit() {
		this.addCheatForm = this.formBuilder.group({
			title: this.title,
			code: this.code,
			description: this.description,
			name: this.name,
			created_by: this.created_by,
			date_created: new Date()
		});
		this.getNames();
	}
	addCheat() {
		if (!this.auth.loggedIn) {
			this.router.navigate(['/login']);
		} else {
			this.cheatService.addCheat(this.addCheatForm.value).subscribe(
				res => {
					const newCheat = res.json();
					this.cheats.push(newCheat);
					this.addCheatForm.reset();
					this.toast.setMessage('item added successfully.', 'success');
					setTimeout(() => {
						this.router.navigate(['/']);
					}, 1000);
				},
				error => console.log(error)
			);
		}
	}
	getNames() {
		this.cheatService.getNames().subscribe(
			res => {
				console.log(res, 'ato');
				this.cheaterNames = res;
			},
			error => console.log(error)
		);
	}
}
