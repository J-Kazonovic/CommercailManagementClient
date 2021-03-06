import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { EbListComptableComponent } from './view/eb/eb-list/eb-list-comptable/eb-list-comptable.component';
import { LoginFormComponent } from './view/login-form/login-form.component';
import { ChefDashBoardComponent } from './view/dashboard/chef-dash-board/chef-dash-board.component';
import { StufDashBoardComponent } from './view/dashboard/stuf-dash-board/stuf-dash-board.component';
import { EbListChefComponent } from './view/eb/eb-list/eb-list-chef/eb-list-chef.component';
import { EbCreateComponent } from './view/eb/eb-create/eb-create.component';
import { EbListStufComponent } from './view/eb/eb-list/eb-list-stuf/eb-list-stuf.component';
import { ComptableDashBoardComponent } from './view/dashboard/comptable-dash-board/comptable-dash-board.component';
import { FournisseurCreateComponent } from './view/fournisseur/fournisseur-create/fournisseur-create.component';
import { FournisseurListComponent } from './view/fournisseur/fournisseur-list/fournisseur-list.component';
import { DemandePrixComponent } from './view/achat/achat/demande-prix/demande-prix.component';
import { ProductCreateComponent } from './view/produit/product-create/product-create.component';
import { ProductListComponent } from './view/produit/product-list/product-list.component';
import { AchatListComponent } from './view/achat/achat-list/achat-list.component';
import { AchatComponent } from './view/achat/achat/achat.component';
import { CommandeBonComponent } from './view/achat/achat/commande-bon/commande-bon.component';
import { DemandePrixFinalComponent } from './view/achat/achat/demande-prix-final/demande-prix-final.component';
import { StockCreateComponent } from './view/stock/stock-create/stock-create.component';
import { StockItemComponent } from './view/stock/stock-item/stock-item.component';
import { StockListComponent } from './view/stock/stock-list/stock-list.component';
import { CommandeBonFinalComponent } from './view/achat/achat/commande-bon-final/commande-bon-final.component';
import { FactureFinalComponent } from './view/facture/facture-final/facture-final.component';
import { FactureFormComponent } from './view/facture/facture-form/facture-form.component';
import { FactureListComponent } from './view/facture/facture-list/facture-list.component';
import { UserFormComponent } from './view/users/user-form/user-form.component';
import { UserListComponent } from './view/users/user-list/user-list.component';
import { AuthGuardService } from './controller/service/auth-guard.service';
import { ProfileComponent } from './view/profile/profile.component';


const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "login", component: LoginFormComponent},

  {
    path: "chef", component: ChefDashBoardComponent, children: [
      { path: "user", component: UserFormComponent },
      { path: "users", component: UserListComponent },
      { path: "ebs", component: EbListChefComponent },
      { path: "achats", component: AchatListComponent },
      { path: "fournisseurs", component: FournisseurListComponent},
      { path: "produits", component: ProductListComponent},
      { path: "stocks", component: StockListComponent},
    ],
  },
  {
    path: "stuf", component: StufDashBoardComponent, children: [
      { path: "eb", component: EbCreateComponent},
      { path: "ebs", component: EbListStufComponent},
      { path: "produits", component: ProductListComponent},
    ],
  },
  {
    path: "comptable", component: ComptableDashBoardComponent, children: [
      { path: "profile", component: ProfileComponent},

      { path: "ebs", component: EbListComptableComponent},

      { path: "achat", component: AchatComponent},
      { path: "achats/:ref", component: AchatComponent},

      { path: "dp", component: DemandePrixComponent},
      { path: "dp/ref/:ref", component: DemandePrixFinalComponent},

      { path: "bc", component: CommandeBonComponent},
      { path: "bc/ref/:ref", component: CommandeBonFinalComponent},
      { path: "achats", component: AchatListComponent },

      { path: "facture/achat/:ref", component: FactureFinalComponent },
      { path: "facturation", component: FactureFormComponent },
      { path: "factures", component: FactureListComponent},

      { path: "commande", component: CommandeBonComponent},
      { path: "fournisseur", component: FournisseurCreateComponent},
      { path: "fournisseurs", component: FournisseurListComponent},
      { path: "produit", component: ProductCreateComponent},
      { path: "produits", component: ProductListComponent},
      { path: "stock", component: StockCreateComponent},
      { path: "stockItem", component: StockItemComponent},
      { path: "stocks", component: StockListComponent},
    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
