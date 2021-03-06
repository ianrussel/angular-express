import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../shared/common/common.service';

import { CheatService } from '../services/cheat.service';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
    public values ='';
    constructor(
        private cheatService: CheatService,
        private router: Router,
        private commonService: CommonService) { }
    ngOnInit() {}
    onSubmit(value: string) {
        this.values = value;
        this.cheatService.searchCheats(value).subscribe(
			res => {
				console.log(res, 'return from search');
                this.commonService.notifyOther({option: 'onSearchResult', value: res});
                this.router.navigate(['/search-result']);
                value = '';
			},
			error => console.log(error.toString())
		);
    }
    // onSubmit(event: any) {
    //     this.cheatService.searchCheats(event.target.value).subscribe(
	// 		res => {
	// 			console.log(res, 'return from search');
    //             this.commonService.notifyOther({option: 'onSearchResult', value: res});
    //             this.router.navigate(['/search-result']);
	// 		},
	// 		error => console.log(error.toString())
	// 	);
    // }
}
