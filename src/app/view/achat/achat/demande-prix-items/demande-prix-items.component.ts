import { Component, OnInit, Input } from '@angular/core';
import { AchatService } from 'src/app/controller/service/achat.service';
import { AchatItem } from 'src/app/controller/entity/achat-item.model';
import { UtilList } from 'src/app/util/utillist.module';

@Component({
  selector: 'app-demande-prix-items',
  templateUrl: './demande-prix-items.component.html',
  styleUrls: ['./demande-prix-items.component.css']
})
export class DemandePrixItemsComponent implements OnInit {
  
  @Input() items=new Array<AchatItem>();

  constructor(private achatService:AchatService) { }

  ngOnInit(): void {
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
