import { Component, OnInit, Input } from '@angular/core';
import { AchatItem } from 'src/app/controller/entity/achat-item.model';
import { BonCommandeService } from 'src/app/controller/service/bon-commande.service';

@Component({
  selector: 'app-facture-items',
  templateUrl: './facture-items.component.html',
  styleUrls: ['./facture-items.component.css']
})
export class FactureItemsComponent implements OnInit {
  
  @Input() items=new Array<AchatItem>();

  constructor(private bcService:BonCommandeService) { }

  ngOnInit(): void {
  }
  
}
