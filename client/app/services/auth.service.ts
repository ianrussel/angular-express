import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';
import 'rxjs/add/operator/filter';
import * as auth0 from 'auth0-js';

import { UserService } from '../services/user.service';

@Injectable()
export class AuthService {
	auth0 = new auth0.WebAuth({
		clientID: 'yxFTYDFjVTO5K9IQm2JJAxpblxLA1RJq',
    	domain: 'cheatsheet.auth0.com',
	    responseType: 'token id_token',
	    audience: 'https://cheatsheet.auth0.com/userinfo',
	    redirectUri: 'http://localhost:4200/callback',
        scope: 'openid user_id name nickname email picture'
	});
	loggedIn = false;
	isAdmin = false;

	jwtHelper: JwtHelper = new JwtHelper();

	currentUser = { _id: '', username: '', role: '' };

	constructor(private userService: UserService,
							private router: Router) {
		const token = localStorage.getItem('token');
		if (token) {
			const decodedUser = this.decodeUserFromToken(token);
			this.setCurrentUser(decodedUser);
		}
	}
	public logins(): void {
		this.auth0.authorize();
	}
	public handleAuthentication(): void {
	    this.auth0.parseHash((err, authResult) => {
	      if (authResult && authResult.accessToken && authResult.idToken) {
	        window.location.hash = '';
	        this.setSession(authResult);
	        this.router.navigate(['']);
	      } else if (err) {
	        this.router.navigate(['/login']);
	        console.log(err);
	      }
	    });
  	}

	private setSession(authResult): void {
	    // Set the time that the access token will expire at
	    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
	    localStorage.setItem('access_token', authResult.accessToken);
	    localStorage.setItem('id_token', authResult.idToken);
	    localStorage.setItem('expires_at', expiresAt);
	}

  	public logouts(): void {
	    // Remove tokens and expiry time from localStorage
	    localStorage.removeItem('access_token');
	    localStorage.removeItem('id_token');
	    localStorage.removeItem('expires_at');
	    // Go back to the home route
	    this.router.navigate(['/']);
  	}

  	public isAuthenticated(): boolean {
    	// Check whether the current time is past the
    	// access token's expiry time
    	const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    	return new Date().getTime() < expiresAt;
  	}

	login(emailAndPassword) {
		return this.userService.login(emailAndPassword).map(res => res.json()).map(
			res => {
				localStorage.setItem('token', res.token);
				const decodedUser = this.decodeUserFromToken(res.token);
				this.setCurrentUser(decodedUser);
				return this.loggedIn;
			}
		);
	}

	logout() {
		localStorage.removeItem('token');
		this.loggedIn = false;
		this.isAdmin = false;
		this.currentUser = { _id: '', username: '', role: '' };
		this.router.navigate(['/']);
	}

	decodeUserFromToken(token) {
		return this.jwtHelper.decodeToken(token).user;
	}

	setCurrentUser(decodedUser) {
		this.loggedIn = true;
		this.currentUser._id = decodedUser._id;
		this.currentUser.username = decodedUser.username;
		this.currentUser.role = decodedUser.role;
		decodedUser.role === 'admin' ? this.isAdmin = true : this.isAdmin = false;
		delete decodedUser.role;
	}

}
