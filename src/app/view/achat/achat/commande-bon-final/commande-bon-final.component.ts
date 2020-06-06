import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { UtilStatuts } from 'src/app/util/utilstatuts.module';
import { AchatItem } from 'src/app/controller/entity/achat-item.model';
import { AchatService } from 'src/app/controller/service/achat.service';
import { AchatItemService } from 'src/app/controller/service/achat-item.service';
import { Achat } from 'src/app/controller/entity/achat.model';
import { BonCommandeService } from 'src/app/controller/service/bon-commande.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FournisseurService } from 'src/app/controller/service/fournisseur.service';
import { Fournisseur } from 'src/app/controller/entity/fournisseur.model';

@Component({
  selector: 'app-commande-bon-final',
  templateUrl: './commande-bon-final.component.html',
  styleUrls: ['./commande-bon-final.component.css']
})
export class CommandeBonFinalComponent implements OnInit,OnChanges {

  
  private sub: any;
  ref: string;
  
  statuts=[UtilStatuts.DEMMANDE_BROUILLON
    ,UtilStatuts.DEMMANDE
    ,UtilStatuts.DEVI_RECU
    ,UtilStatuts.COMMANDE];


    fournisseurs = new Array<Fournisseur>();
    fourn = new Fournisseur();
    nom: string;  
  
  
  
    dbItems=new Array<AchatItem>();

  constructor(private achatService: AchatService
    , private bcService:BonCommandeService 
    , private router: Router
    , private route: ActivatedRoute
    , private frService: FournisseurService
    , private achatItemService: AchatItemService) { }

  ngOnInit(): void {
     this.getAllFournisseurs();

     this.sub = this.route.params.subscribe(params => {
      this.ref = params['ref'];
      this.getAchatByRef(this.ref);
      this.getAllDBAchatItems(this.ref); 
      this.getFournByNom();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    
  }

  
  getFournByNom() {
    this.frService.getfournByNom(this.achat.fournisseur.nom).subscribe(
      data => {
        this.fourn = data;
      }, error => {
        console.log(error);
      }
    );
  }


  //API Calls
  updateAchat() {
    this.achat.achatItems = this.achatItemsDB;
    this.achat.total=this.calculTotal();
    this.achatService.updateAchat(this.achat).subscribe(
      data => {
        console.log(data);
      }, error => {
        console.log(error);
      }
    );
  }
  backToDemande(){
    this.achat.statut=this.statuts[1];
    this.achatService.updateAchat(this.achat).subscribe(
      data => {
        this.router.navigate(['comptable/dp/ref',this.achat.ref]);
      }, error => {
        console.log(error);
      }
    );
  }

  update(achat:Achat){
    this.achatService.updateAchat(achat).subscribe(
      data => {
        this.router.navigate(['comptable/bc/ref',this.achat.ref]);
      }, error => {
        console.log(error);
      }
    );
  }
  getAllFournisseurs() {
    this.frService.getAllFournisseur().subscribe(
      data => {
        this.fournisseurs = data;
      }, error => {
        console.log("error" + error);
      }
    );
  }
  getAchatByRef(ref:string){
    this.achatService.getAchatByRef(ref).subscribe(
      data => {
        this.bcService.achat = data;
      }, error => {
        console.log(error);
      }
    )
  }
  getAllDBAchatItems(ref:string) {
    this.achatItemService.getAchatItemsByAchat(ref).subscribe(
      data => {
        this.bcService.achatItemsDB= data;
      }, error => {
        console.log(error);
      }
    );
  }
  //API Calls

  calculTotal(){
    let total=0;
    this.achatItemsDB.forEach(item=>{
      total=total+ item.totalPrice;
    })

    return total;
  }

  get achat(): Achat {
    return this.bcService.achat;
  }

  get achatItemsDB(): Array<AchatItem> {
    return this.bcService.achatItemsDB;
	} 


}
