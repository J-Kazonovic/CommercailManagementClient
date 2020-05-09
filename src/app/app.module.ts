import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

/*Routing*/
import { AppRoutingModule } from './app-routing.module';

import { FormsModule } from '@angular/forms'; 
import { CommonModule } from "@angular/common";



/*HTTP*/
import { HttpClientModule } from '@angular/common/http';

/*Component*/
import { AppComponent } from './app.component';
import { LoginFormComponent } from './view/login/login-form/login-form.component';
import { SignupFormComponent } from './view/login/signup-form/signup-form.component';

import { StatutComponent } from './view/util/statut/statut.component';
import { ChefDashBoardComponent } from './view/dashboard/chef-dash-board/chef-dash-board.component';
import { StufDashBoardComponent } from './view/dashboard/stuf-dash-board/stuf-dash-board.component';
import { EbListComptableComponent } from './view/eb/eb-list/eb-list-comptable/eb-list-comptable.component';

import { EbListStufComponent } from './view/eb/eb-list/eb-list-stuf/eb-list-stuf.component';
import { EbCreateComponent } from './view/eb/eb-create/eb-create.component';
import { EbpListCurrentComponent } from './view/eb/eb-create/ebp-list-current/ebp-list-current.component';
import { EbListCurrentComponent } from './view/eb/eb-create/eb-list-current/eb-list-current.component';
import { EbpFormComponent } from './view/eb/eb-create/ebp-form/ebp-form.component';
import { EbListChefComponent } from './view/eb/eb-list/eb-list-chef/eb-list-chef.component';
import { ComptableDashBoardComponent } from './view/dashboard/comptable-dash-board/comptable-dash-board.component';

@NgModule({
  declarations: [ 
    AppComponent,
    LoginFormComponent,
    SignupFormComponent,
    EbCreateComponent,
    EbpListCurrentComponent,
    EbListCurrentComponent,
    EbpFormComponent,
    StatutComponent,
    ChefDashBoardComponent,
    StufDashBoardComponent,
    EbListChefComponent,
    EbListComptableComponent,
    EbListStufComponent,
    ComptableDashBoardComponent,

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
