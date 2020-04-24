import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

/*Routing*/
import { AppRoutingModule } from './app-routing.module';

/*Forms*/
import { FormsModule } from '@angular/forms';

/*HTTP*/
import { HttpClientModule } from '@angular/common/http';

/*Component*/
import { AppComponent } from './app.component';
import { LoginFormComponent } from './Login/login-form/login-form.component';
import { TopNavComponent } from './stuf-dash-board/top-nav/top-nav.component';
import { SignupFormComponent } from './Login/signup-form/signup-form.component';
import { EbCreateComponent } from './eb/eb-create/eb-create.component';
import { EbListComponent } from './eb/eb-list/eb-list.component';
import { EbpListComponent } from './eb/eb-list/ebp-list/ebp-list.component';
import { EbpListCurrentComponent } from './eb/eb-create/ebp-list-current/ebp-list-current.component';
import { EbListCurrentComponent } from './eb/eb-create/eb-list-current/eb-list-current.component';
import { EbpFormComponent } from './eb/eb-create/ebp-form/ebp-form.component';
import { StatutComponent } from './ToolsComponent/statut/statut.component';
import { ChefDashBoardComponent } from './chef-dash-board/chef-dash-board.component';
import { StufDashBoardComponent } from './stuf-dash-board/stuf-dash-board.component';

@NgModule({
  declarations: [ 
    AppComponent,
    LoginFormComponent,
    TopNavComponent,
    SignupFormComponent,
    EbCreateComponent,
    EbListComponent,
    EbpListComponent,
    EbpListCurrentComponent,
    EbListCurrentComponent,
    EbpFormComponent,
    StatutComponent,
    ChefDashBoardComponent,
    StufDashBoardComponent,

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
