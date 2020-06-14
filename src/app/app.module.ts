import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

/*Routing*/
import { AppRoutingModule } from './app-routing.module';

import { FormsModule } from '@angular/forms'; 
import { CommonModule } from "@angular/common";





/*HTTP*/
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

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
import { AchatItemSearchComponent } from './view/achat/achat/achat-item-search/achat-item-search.component';
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
import { CommandeBonFinalComponent } from './view/achat/achat/commande-bon-final/commande-bon-final.component';
import { DemandePrixFinalComponent } from './view/achat/achat/demande-prix-final/demande-prix-final.component';
import { StockComponent } from './view/stock/stock/stock.component';
import { StockCreateComponent } from './view/stock/stock-create/stock-create.component';
import { StockItemComponent } from './view/stock/stock-item/stock-item.component';
import { StockListComponent } from './view/stock/stock-list/stock-list.component';
import { FactureFormComponent } from './view/facture/facture-form/facture-form.component';
import { FactureListComponent } from './view/facture/facture-list/facture-list.component';
import { FactureFinalComponent } from './view/facture/facture-final/facture-final.component';
import { FactureItemsComponent } from './view/facture/facture-items/facture-items.component';
import { TokeninterceptorService } from './controller/service/tokeninterceptor.service';
import { UserFormComponent } from './view/users/user-form/user-form.component';
import { UserListComponent } from './view/users/user-list/user-list.component';



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
    AchatItemSearchComponent,
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
    CommandeBonFinalComponent,
    DemandePrixFinalComponent,
    StockComponent,
    StockCreateComponent,
    StockItemComponent,
    StockListComponent,
    FactureFormComponent,
    FactureListComponent,
    FactureFinalComponent,
    FactureItemsComponent,
    UserFormComponent,
    UserListComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: TokeninterceptorService, multi: true},],
  bootstrap: [AppComponent]
})
export class AppModule { }
