import { Component, OnInit, SimpleChanges } from '@angular/core';
import { UtilStatuts } from 'src/app/util/utilstatuts.module';
import { Fournisseur } from 'src/app/controller/entity/fournisseur.model';
import { AchatItem } from 'src/app/controller/entity/achat-item.model';
import { AchatService } from 'src/app/controller/service/achat.service';
import { FournisseurService } from 'src/app/controller/service/fournisseur.service';
import { AchatItemService } from 'src/app/controller/service/achat-item.service';
import { Achat } from 'src/app/controller/entity/achat.model';
import { ActivatedRoute, Router } from '@angular/router';
import { DemmandePrixService } from 'src/app/controller/service/demmande-prix.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-demande-prix-final',
  templateUrl: './demande-prix-final.component.html',
  styleUrls: ['./demande-prix-final.component.css']
})
export class DemandePrixFinalComponent implements OnInit {

  private sub: any;
  ref: string;



  statuts = [UtilStatuts.DEMMANDE_BROUILLON
    , UtilStatuts.DEMMANDE
    , UtilStatuts.DEVI_RECU
    , UtilStatuts.COMMANDE];


  fournisseurs = Array<Fournisseur>();
  fourn = new Fournisseur();
  nom: string;




  constructor(private achatService: AchatService
    , private dpService: DemmandePrixService
    , private route: ActivatedRoute
    , private router: Router
    , private frService: FournisseurService
    , private achatItemService: AchatItemService) { }


    generatePdf(){
      console.log(this.achatItemsDB);
      for (var i = 0;i < this.achatItemsDB.length; i++) {
        const documentDefinition = { content: [
          {
            text: 'Demmande De Prix Reference  '+this.achat.ref,
            bold: true,
            fontSize: 20,
            alignment: 'left',
            margin: [0, 0, 0, 20],
          },
          
          {
           columns: [
             [{
              text: 'Date : ' +this.achat.dateLivraison,style: 'header'
            },{
              text: 'Nom: ' +this.achat.fournisseur.nom,style: 'anotherStyle'
            },{
              text: 'Email : ' +this.achat.fournisseur.email,style: 'anotherStyle'
            },{
              text: 'Adresse : ' +this.achat.fournisseur.adress,style: 'anotherStyle'
            },{
              text: 'Tel : ' +this.achat.fournisseur.tel,style: 'anotherStyle'
            }
             ],
           ],lineHeight: 3,
         },
         {
           table: {
             // headers are automatically repeated if the table spans over multiple pages
             // you can declare how many rows should be treated as headers
             headerRows: 1,
             widths: [100,100,100, 100,100],
  
             body: [
               ["Ref","Categorie","Designation","Uniter","Quantiter"],
               [this.achatItemsDB[i].produit.ref,this.achatItemsDB[i].produit.cat.libelle,this.achatItemsDB[i].produit.libelle,this.achatItemsDB[i].produit.unite.libelle,this.achatItemsDB[i].qteCommander],
               [this.achatItemsDB[i+1].produit.ref,this.achatItemsDB[i+1].produit.cat.libelle,this.achatItemsDB[i+1].produit.libelle,this.achatItemsDB[i+1].produit.unite.libelle,this.achatItemsDB[i+1].qteCommander],
             ],
             color:'#191970'
           }
         }
          ],styles: {
            header: {
              bold: true,
              alignment: 'left'
            },
            anotherStyle: {
              italics: true,
              alignment: 'right'
            }
          },
         }; 
         
         pdfMake.createPdf(documentDefinition).open();
      }
          
        }
  ngOnChanges(changes: SimpleChanges): void {
    this.getFournByNom();

  }


  ngOnInit() {
    this.getAllFournisseurs();
    this.sub = this.route.params.subscribe(params => {
      this.ref = params['ref'];
      this.getAchatByRef(this.ref);
      this.getAllDBAchatItems(this.ref); 
      this.getFournByNom();
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  //API Calls 
  updateDemmande() {
    this.achat.achatItems = this.achatItemsDB;
    this.achatService.updateAchat(this.achat).subscribe(
      data => {
        console.log(data);
      }, error => {
        console.log(error);
      }
    );
  }

  updateToDevis() {
    this.achat.achatItems = this.achatItemsDB;
    this.achat.statut=this.statuts[2];
    this.achatService.updateAchat(this.achat).subscribe(
      data => {
        if(data==1){
          this.router.navigate(['comptable/bc/ref',this.achat.ref]);
        }
      }, error => {
        console.log(error);
      }
    );
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
        this.dpService.achat = data;
      }, error => {
        console.log(error);
      }
    )
  }

  getAllDBAchatItems(ref:string) {
    this.achatItemService.getAchatItemsByAchat(ref).subscribe(
      data => {
        this.dpService.achatItemsDB= data;
      }, error => {
        console.log(error);
      }
    );
  }
  //API Calls


  /**Getters & Setters */
  get achat(): Achat {
    return this.dpService.achat;
  }

  public get achatItemsDB(): Array<AchatItem> {
		return this.dpService.achatItemsDB;
	}

  /**Getters & Setters */

}
