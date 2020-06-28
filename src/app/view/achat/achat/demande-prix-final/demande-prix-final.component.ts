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
import { AlertService } from 'src/app/controller/service/alert.service';
import { EmailService } from 'src/app/controller/service/email.service';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-demande-prix-final',
  templateUrl: './demande-prix-final.component.html',
  styleUrls: ['./demande-prix-final.component.css']
})

export class DemandePrixFinalComponent implements OnInit {

  //Const


  //Routing
  private sub: any;
  ref: string;

  //Achat Statuts
  statuts = [UtilStatuts.DEMMANDE,UtilStatuts.COMMANDE];


  //Fournisseur
  fournisseurs = Array<Fournisseur>();
  fourn = new Fournisseur();


  //PDF
  pdfName="fstg-demande-prix-";


  constructor(private achatService: AchatService
    , private dpService: DemmandePrixService
    , private frService: FournisseurService
    , private achatItemService: AchatItemService
    , private route: ActivatedRoute
    , private router: Router
    , private alertService:AlertService) { }



  ngOnChanges(changes: SimpleChanges): void {
    this.getFournByNom();
  }

  ngOnInit() {
    this.getAllFournisseurs();
    this.sub = this.route.params.subscribe(params => {
      this.ref = params['ref'];
      this.getAchatByRef(this.ref);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }


  //Events
  onDemandeUpdate(){
    this.updateDemande();
  }

  onDemandeToCommande(){
    this.updateToCommande();
  }
  //Events



  //API Calls 
  updateDemande() {
    this.achat.achatItems = this.achatItemsDB;
    this.achatService.updateAchat(this.achat).subscribe(
      data => {
        this.alertService.setSuccessAlert("Demande Updated Successfuly.");
      }, error => {
        this.alertService.setSuccessAlert("Please Try Again!")
        console.log(error);
      }
    );
  }

  updateToCommande() {
    this.achat.achatItems = this.achatItemsDB;
    this.achat.statut = this.statuts[2];
    this.achatService.updateAchat(this.achat).subscribe(
      data => {
        if (data == 1) {
          this.alertService.setSuccessAlert("Commande Created Successfuly.");
          this.router.navigate(['comptable/bc/ref', this.achat.ref]);
        }
      }, error => {
        this.alertService.setSuccessAlert("Please Try Again!");
        console.log(error);
      }
    );
  }

  getAchatByRef(ref: string) {
    this.achatService.getAchatByRef(ref).subscribe(
      data => {
        this.dpService.achat = data;
        this.fourn=this.achat.fournisseur;
        this.getAllDBAchatItems(this.ref);
        this.getFournByNom();
      }, error => {
        console.log(error);
      }
    )
  }

  getAllDBAchatItems(ref: string) {
    this.achatItemService.getAchatItemsByAchat(ref).subscribe(
      data => {
        this.dpService.achatItemsDB = data;
      }, error => {
        console.log(error);
      }
    );
  }

  getFournByNom() {
    this.frService.getfournByNom(this.fourn.nom).subscribe(
      data => {
        this.dpService.achat.fournisseur = data;
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
        console.log(error);
      }
    );
  }
  //API Calls



  //PDF
  col1="Produit";
  col2="Category";
  col3="Unite";
  col4="Quantité Demander";
  buildTableBody(data, columns) {
    var body = [];
    body.push(columns);
    data.forEach((row: AchatItem) => {
      var dataRow = [];
      columns.forEach(function (column) {

        if (column=="Produit") {
          dataRow.push(row["produit"]["libelle"]);
        }else if (column=="Category") {
          dataRow.push(row["produit"]["cat"]["libelle"]);
        }else if (column =="Unite") {
          dataRow.push(row["produit"]["unite"]["libelle"]);
        }else if(column== "Quantité Demander"){
          dataRow.push(row["qteCommander"]);
        }

      })

      body.push(dataRow);
    });

    return body;
  }
  table(data, columns) {
    return {
      table: {
        headerRows: 1,
        body: this.buildTableBody(data, columns)
      }
    };
  }
  generatePdf() {
    var dd=null;
    console.log(this.achatItemsDB);
      dd = {
        content: [
          {
            text: 'Demmande De Prix ' + this.achat.ref,
            bold: true,
            fontSize: 20,
            alignment: 'left',
            margin: [0, 0, 0, 20],
          },

          {
            columns: [
              [{
                text: 'Date : ' + this.achat.dateLivraison, style: 'header'
              }, {
                text: 'Nom: ' + this.achat.fournisseur.nom, style: 'anotherStyle'
              }, {
                text: 'Email : ' + this.achat.fournisseur.email, style: 'anotherStyle'
              }, {
                text: 'Adresse : ' + this.achat.fournisseur.adress, style: 'anotherStyle'
              }, {
                text: 'Tel : ' + this.achat.fournisseur.tel, style: 'anotherStyle'
              }
              ],
            ], lineHeight: 3,
          },this.table(this.achatItemsDB, [this.col1, this.col2, this.col3, this.col4])
        ], styles: {
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
    
    return dd;
  }


  openPDF(){
    const b =this.generatePdf();
    pdfMake.createPdf(b).open();
  }
  downloadPDF(){
    const b =this.generatePdf();
    pdfMake.createPdf(b).download(this.pdfName+this.achat.ref+".pdf");
  }


  //PDF

  //Getters & Setters
  get achat(): Achat {
    return this.dpService.achat;
  }

  public get achatItemsDB(): Array<AchatItem> {
    return this.dpService.achatItemsDB;
  }
  //Getters & Setters

}
