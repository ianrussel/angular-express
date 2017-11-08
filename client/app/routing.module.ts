import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CheatsComponent } from './cheats/cheats.component';
import { AboutComponent } from './about/about.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AccountComponent } from './account/account.component';
import { AdminComponent } from './admin/admin.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AddComponent } from './cheats/add.component';
import { AuthGuardLogin } from './services/auth-guard-login.service';
import { AuthGuardAdmin } from './services/auth-guard-admin.service';
import { CallbackComponent } from './callback/callback.component';


const routes: Routes = [
	{ path: '', component: AboutComponent },
	{ path: 'cheats', component: CheatsComponent },
	{ path: 'cheats/:name', component: CheatsComponent },
	{ path: 'register', component: RegisterComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'logout', component: LogoutComponent },
	{ path: 'account', component: AccountComponent, canActivate: [AuthGuardLogin] },
	{ path: 'admin', component: AdminComponent, canActivate: [AuthGuardAdmin] },
	{ path: 'addNewCheat', component: AddComponent },
	{ path: 'notfound', component: NotFoundComponent },
	{ path: '**', redirectTo: '/notfound' }
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})

export class RoutingModule {}
