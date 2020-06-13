import { Component, OnInit, Input } from '@angular/core';
import { AchatItem } from 'src/app/controller/entity/achat-item.model';
import { AchatService } from 'src/app/controller/service/achat.service';
import { UtilList } from 'src/app/util/utillist.module';

@Component({
  selector: 'app-commande-bon-items',
  templateUrl: './commande-bon-items.component.html',
  styleUrls: ['./commande-bon-items.component.css']
})
export class CommandeBonItemsComponent implements OnInit {
  
  @Input() items=new Array<AchatItem>();

  constructor(private achatService:AchatService) { }

  ngOnInit(): void {
    
  }

  onAddItem(item: AchatItem) {
    if (item != null) {
      this.items.push(item);
    }
  }

  deleteProduct(aI:AchatItem) {
    this.achatService.deleteProduct(aI).subscribe(
      data => {
        this.achatService.onStockItemDelete(aI,this.items);
      }, error => {
        console.log(error);
      }
    );
  }

  
}
