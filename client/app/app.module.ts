import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { RoutingModule } from './routing.module';
import { SharedModule } from './shared/shared.module';
import { CheatService } from './services/cheat.service';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { AuthGuardLogin } from './services/auth-guard-login.service';
import { AuthGuardAdmin } from './services/auth-guard-admin.service';
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
import { HighlightModule } from 'ngx-highlightjs';

@NgModule({
	declarations: [
		AppComponent,
		CheatsComponent,
		AboutComponent,
		RegisterComponent,
		LoginComponent,
		LogoutComponent,
		AccountComponent,
		AdminComponent,
		NotFoundComponent,
		AddComponent
	],
	imports: [
		RoutingModule,
		SharedModule,
		HighlightModule.forRoot({ theme: 'darkula'})
	],
	providers: [
		AuthService,
		AuthGuardLogin,
		AuthGuardAdmin,
		CheatService,
		UserService
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	bootstrap: [AppComponent]
})

export class AppModule { }
