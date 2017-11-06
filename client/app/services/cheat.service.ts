import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class CheatService {

	private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
	private options = new RequestOptions({ headers: this.headers });

	constructor(private http: Http) { }

	getCheats(): Observable<any> {
		return this.http.get('api/cheats').map(res => res.json());
	}
	countCheats(): Observable<any> {
		return this.http.get('/api/cheats/count').map(res => res.json());
	}

	addCheat(cheat): Observable<any> {
		return this.http.post('/api/cheat', JSON.stringify(cheat), this.options);
	}

	getCheat(cheat): Observable<any> {
		return this.http.get(`/api/cheat/${cheat._id}`).map(res => res.json());
	}

	editCheat(cheat): Observable<any> {
		return this.http.put(`/api/cheat/${cheat._id}`, JSON.stringify(cheat), this.options);
	}

	deleteCheat(cheat): Observable<any> {
		return this.http.delete(`/api/cheat/${cheat._id}`, this.options);
	}

	getNames(): Observable<any> {
		return this.http.get('/api/cheats/getNames').map(res => res.json());
	}
	getCheatsWithParam(param): Observable<any> {
		return this.http.get(`/api/cheats/cheatsWithParams/${param}`).map(res => res.json());
	}
}
