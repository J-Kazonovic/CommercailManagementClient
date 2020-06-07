import { Component, OnInit, Input } from '@angular/core';
import { AchatItem } from 'src/app/controller/entity/achat-item.model';

@Component({
  selector: 'app-facture-items',
  templateUrl: './facture-items.component.html',
  styleUrls: ['./facture-items.component.css']
})
export class FactureItemsComponent implements OnInit {
  
  @Input() items=new Array<AchatItem>();

  constructor() { }

  ngOnInit(): void {
  }

}
