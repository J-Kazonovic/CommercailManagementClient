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
import { LoginFormComponent } from './view/login-form/login-form.component';

import { StatutComponent } from './view/util/statut/statut.component';
import { MythComponent } from './view/util/myth/myth.component';

/**DashBoards*/
import { ChefDashBoardComponent } from './view/dashboard/chef-dash-board/chef-dash-board.component';
import { StufDashBoardComponent } from './view/dashboard/stuf-dash-board/stuf-dash-board.component';
import { ComptableDashBoardComponent } from './view/dashboard/comptable-dash-board/comptable-dash-board.component';

/*EB*/
import { EbListComptableComponent } from './view/eb/eb-list/eb-list-comptable/eb-list-comptable.component';
import { EbListStufComponent } from './view/eb/eb-list/eb-list-stuf/eb-list-stuf.component';
import { EbCreateComponent } from './view/eb/eb-create/eb-create.component';
import { EbpListCurrentComponent } from './view/eb/eb-create/ebp-list-current/ebp-list-current.component';
import { EbListCurrentComponent } from './view/eb/eb-create/eb-list-current/eb-list-current.component';
import { EbpFormComponent } from './view/eb/eb-create/ebp-form/ebp-form.component';
import { EbListChefComponent } from './view/eb/eb-list/eb-list-chef/eb-list-chef.component';

/*Achat*/
import { DemandePrixComponent } from './view/achat/achat/demande-prix/demande-prix.component';
import { CommandeBonComponent } from './view/achat/achat/commande-bon/commande-bon.component';
import { ProductSearchComponent } from './view/achat/achat/product-search/product-search.component';
import { DemandePrixItemsComponent } from './view/achat/achat/demande-prix-items/demande-prix-items.component';
import { AchatItemFormComponent } from './view/achat/achat/achat-item-form/achat-item-form.component';
import { AchatListComponent } from './view/achat/achat-list/achat-list.component';
import { CommandeBonItemsComponent } from './view/achat/achat/commande-bon-items/commande-bon-items.component';
import { AchatComponent } from './view/achat/achat/achat.component';


/*Fournisseur*/
import { FournisseurCreateComponent } from './view/fournisseur/fournisseur-create/fournisseur-create.component';
import { FournisseurListComponent } from './view/fournisseur/fournisseur-list/fournisseur-list.component';

/*Produit*/
import { ProductCreateComponent } from './view/produit/product-create/product-create.component';
import { ProductListComponent } from './view/produit/product-list/product-list.component';
import { CategoryCreateComponent } from './view/produit/category-create/category-create.component';
import { UniteCreateComponent } from './view/produit/unite-create/unite-create.component';
import { HomeComponent } from './view/home/home.component';



@NgModule({
  declarations: [ 
    AppComponent,
    LoginFormComponent,
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
    DemandePrixComponent,
    CommandeBonComponent,
    FournisseurCreateComponent,
    FournisseurListComponent,
    ProductSearchComponent,
    DemandePrixItemsComponent,
    ProductCreateComponent,
    ProductListComponent,
    CategoryCreateComponent,
    UniteCreateComponent,
    MythComponent,
    AchatItemFormComponent,
    AchatListComponent,
    CommandeBonItemsComponent,
    AchatComponent,
    HomeComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
