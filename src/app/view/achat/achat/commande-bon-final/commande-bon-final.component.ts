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
import { AlertService } from 'src/app/controller/service/alert.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-commande-bon-final',
  templateUrl: './commande-bon-final.component.html',
  styleUrls: ['./commande-bon-final.component.css']
})
export class CommandeBonFinalComponent implements OnInit{

  
  private sub: any;
  ref: string;

  //PDF
  pdfName="fstg-comande-prix-";
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
    , private alertService: AlertService
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
    this.achat.statut=this.statuts[3];
    this.achat.total=this.calculTotal();
    this.achatService.updateAchat(this.achat).subscribe(
      data => {
        this.alertService.setSuccessAlert("Commande Created Successfuly.");
        console.log(data);
      }, error => {
        this.alertService.setDangerAlert("Please Try Again.");
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
        console.log( error);
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
  //PDF
  col="Reference";
  col1="Produit";
  col2="Category";
  col3="Unite";
  col4="Quantité Demander";
  col5="Prix Unit";
  col6="Sous-total";
  buildTableBody(data, columns) {
    var body = [];
    body.push(columns);
    data.forEach((row: AchatItem) => {
      var dataRow = [];
      columns.forEach(function (column) {
        if (column=="Reference") {
          dataRow.push(row["produit"]["ref"]);
        } else if(column=="Produit") {
          dataRow.push(row["produit"]["libelle"]);
        }else if (column=="Category") {
          dataRow.push(row["produit"]["cat"]["libelle"]);
        }else if (column =="Unite") {
          dataRow.push(row["produit"]["unite"]["libelle"]);
        }else if(column== "Quantité Demander"){
          dataRow.push(row["qteCommander"]);
        }else if(column== "Prix Unit"){
          dataRow.push(row["unitPrice"]);
        }else if(column== "Sous-total"){
          dataRow.push(row["totalPrice"]);
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
            text: 'Bon De Commande ' + this.achat.ref,
            bold: true,
            fontSize: 20,
            alignment: 'left',
            margin: [0, 0, 0, 20],
          },
          {
            image: "data:image/jpg;base64,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",
            width: 100,
            height:50,
            alignment: 'right',
            margin: [0,0, 0, 0],
        },
          {
            columns: [
              [{
                text: 'Date : ' + this.achat.dateLivraison, style: 'header'
              }, {
                text: 'Fournisseur', style: 'anotherStyle',
                bold: true,
                fontSize: 15,
              },
               {
                text: 'Nom: ' + this.achat.fournisseur.nom, style: 'anotherStyle'
              }, {
                text: 'Email : ' + this.achat.fournisseur.email, style: 'anotherStyle'
              }, {
                text: 'Adresse : ' + this.achat.fournisseur.adress, style: 'anotherStyle'
              }, {
                text: 'Tel : ' + this.achat.fournisseur.tel, style: 'anotherStyle'
              }
              ],
            ], lineHeight: 2,
          },this.table(this.achatItemsDB, [this.col,this.col1, this.col2, this.col3, this.col4, this.col5, this.col6]),
          {
            columns: [
              [
                {
                text: 'Faculté des Sciences et Techniques' ,
                bold: true,
                fontSize: 10,
                margin: [0, 90, 0, 20],
              }, {
                text: 'Web Site: www.fstg-marrakech.ac.ma',
                fontSize: 8,
              },{
                text: 'Adresse :  B.P 549, Av.Abdelkarim Elkhattabi, Guéliz Marrakech',
                fontSize: 8,
              }, {
                text: 'Tel : (+212) 524 43 34 04 ' ,
                fontSize: 8,
              }, {
                text: 'Fax: (+212) 524 43 31 70 ' ,
                fontSize: 8,
              }
              ],
            ], lineHeight: 2,
          }
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


}
