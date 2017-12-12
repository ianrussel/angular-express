import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { ToastComponent } from './toast/toast.component';
import { LoadingComponent } from './loading/loading.component';
import { CommonService } from './common/common.service';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule
    ],
    exports: [
        // Shared Modules
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        // Shared Components
        ToastComponent,
        LoadingComponent
    ],
    declarations: [
        ToastComponent,
        LoadingComponent
    ],
    providers: [
        ToastComponent,
        CommonService
    ]
})
export class SharedModule { }
