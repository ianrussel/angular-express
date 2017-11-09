import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RoutingModule } from './routing.module';

import { HighlightModule } from 'ngx-highlightjs';

import { SharedModule } from './shared/shared.module';
import { CheatService } from './services/cheat.service';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { AuthGuardLogin } from './services/auth-guard-login.service';
import { AuthGuardAdmin } from './services/auth-guard-admin.service';
import { AppComponent } from './app.component';
import { AppComponent1 } from './app.component1';
import { CheatsComponent } from './cheats/cheats.component';
import { AboutComponent } from './about/about.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AccountComponent } from './account/account.component';
import { AdminComponent } from './admin/admin.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AddComponent } from './cheats/add.component';

import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { QuickSideBarComponent } from './quick-side-bar/quick-side-bar.component';
import { PagebarComponent } from './pagebar/pagebar.component';
import { SettingComponent } from './setting/setting.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AllCheatsComponent } from './cheats/all-cheats/all-cheats.component';
import { CallbackComponent } from './callback/callback.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchComponent } from './search/search.component';
import { SearchResultsComponent } from './search-results/search-results.component';

@NgModule({
	declarations: [
		AppComponent,
		AppComponent1,
		CheatsComponent,
		AboutComponent,
		RegisterComponent,
		LoginComponent,
		LogoutComponent,
		AccountComponent,
		AdminComponent,
		NotFoundComponent,
		AddComponent,
		FooterComponent,
		HeaderComponent,
		QuickSideBarComponent,
		PagebarComponent,
		SettingComponent,
		SidebarComponent,
		AllCheatsComponent,
		CallbackComponent,
		ProfileComponent,
		SearchComponent,
		SearchResultsComponent
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
