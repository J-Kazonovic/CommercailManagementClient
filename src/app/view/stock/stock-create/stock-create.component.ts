import { Component, OnInit, Input } from '@angular/core';
import { StockService } from 'src/app/controller/service/stock.service';
import { StockItem } from 'src/app/controller/entity/stock-item.model';
import { Stock } from 'src/app/controller/entity/stock.model';
import { ProductService } from 'src/app/controller/service/product.service';
import { Product } from 'src/app/controller/entity/product.model';
import { UtilList } from 'src/app/util/utillist.module';
import { StockItemService } from 'src/app/controller/service/stock-item.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-stock-create',
  templateUrl: './stock-create.component.html',
  styleUrls: ['./stock-create.component.css']
})
export class StockCreateComponent implements OnInit {
  produit=new Array<StockItem>();
  constructor(private stockService: StockService) { }

  ngOnInit(): void {
  }

  onSaveStock() {
    this.stockService.onSaveStock();
  }

  deleteProduct(stockItem:StockItem) {
    UtilList.deleteFromListById(stockItem.produit.id,this.stockItems);
  }
  get item(): StockItem {
    return this.stockService.item;
   }
 
  generatePdf(){
    const documentDefinition = { content: [
     {
       text: 'Stock',
       bold: true,
       fontSize: 20,
       alignment: 'center',
       margin: [0, 0, 0, 20]
     },
     {
      columns: [
        [{
          text: 'Ref : ' +this.stock.ref,
        }
        ]
      ]
    },
    {
      table: {
        // headers are automatically repeated if the table spans over multiple pages
        // you can declare how many rows should be treated as headers
        headerRows: 1,
        widths: [ 100, 100],

        body: [
          [ 'Produit', 'Quantiter' ],
          [ this.item.produit.libelle, this.item.qteStock]
        ]
      }
    }
     ]
    };
    pdfMake.createPdf(documentDefinition).open();
    pdfMake.createPdf(documentDefinition).download();
  }
  get stockItems(): Array<StockItem> {
    return this.stockService.stockItems;
  }

  get stock(): Stock {
    return this.stockService.stock;
  }
  
  
  
}
