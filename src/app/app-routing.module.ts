import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { EbListComptableComponent } from './view/eb/eb-list/eb-list-comptable/eb-list-comptable.component';
import { LoginFormComponent } from './view/login/login-form/login-form.component';
import { ChefDashBoardComponent } from './view/dashboard/chef-dash-board/chef-dash-board.component';
import { StufDashBoardComponent } from './view/dashboard/stuf-dash-board/stuf-dash-board.component';
import { EbListChefComponent } from './view/eb/eb-list/eb-list-chef/eb-list-chef.component';
import { EbCreateComponent } from './view/eb/eb-create/eb-create.component';
import { EbListStufComponent } from './view/eb/eb-list/eb-list-stuf/eb-list-stuf.component';
import { ComptableDashBoardComponent } from './view/dashboard/comptable-dash-board/comptable-dash-board.component';
import { DemmandeListCreateComponent } from './view/eb/eb-list/eb-list-comptable/demmande-list-create/demmande-list-create.component';
import { ProductCreateComponent } from './view/product/product-create/product-create.component';


const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "login", component: LoginFormComponent},

  {
    path: "chef-dashboard", component: ChefDashBoardComponent, children: [
      { path: "eb-list-chef", component: EbListChefComponent, outlet: "dashboard" },
    ]
  },
  {
    path: "stuf-dashboard", component: StufDashBoardComponent, children: [
      { path: "eb-create", component: EbCreateComponent, outlet: "dashboard" },
      { path: "eb-list-stuf", component: EbListStufComponent, outlet: "dashboard" },
    ]
  },
  {
    path: "comptable-dashboard", component: ComptableDashBoardComponent, children: [
      { path: "eb-list-comptable", component: EbListComptableComponent, outlet: "dashboard" },
      { path: "demmande-list-create", component: DemmandeListCreateComponent, outlet: "dashboard" },
      { path: "product-list-create", component: ProductCreateComponent, outlet: "dashboard" },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
