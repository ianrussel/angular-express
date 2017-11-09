import { Component, OnInit } from '@angular/core';
import { CommonService } from '../shared/common/common.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
    public results = '';
    private subscription: Subscription;
    constructor(private commonService: CommonService) { }

    ngOnInit() {
        this.subscription = this.commonService.notifyObservable$.subscribe((res) => {
        	if (res.hasOwnProperty('option') && res.option === 'onSearchResult') {
        		console.log(res.value, 'i am from search results');
        		this.results = res.value;
        	}
        })
    }

}
