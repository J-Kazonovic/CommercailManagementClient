import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EbCreateComponent } from './eb/eb-create/eb-create.component';
import { EbListComponent } from './eb/eb-list/eb-list.component';
import { LoginFormComponent } from './Login/login-form/login-form.component';
import { ChefDashBoardComponent } from './chef-dash-board/chef-dash-board.component';
import { StufDashBoardComponent } from './stuf-dash-board/stuf-dash-board.component';
import { ComptableComponent } from './comptable/comptable.component';
import { EbListComptableComponent } from './eb/eb-list/eb-list-comptable/eb-list-comptable.component';


const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "login", component: LoginFormComponent },

  {
    path: "chef-dashboard", component: ChefDashBoardComponent, children: [
      { path: "eb-list", component: EbListComponent, outlet: "dashboard" },
    ]
  },
  {
    path: "stuf-dashboard", component: StufDashBoardComponent, children: [
      { path: "eb-create", component: EbCreateComponent, outlet: "dashboard" },
      { path: "eb-list", component: EbListComponent, outlet: "dashboard" },
    ]
  },
  {
    path: "comptable", component: ComptableComponent, children: [
      { path: "eb-list-comptable", component: EbListComptableComponent, outlet: "dashboard" },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
