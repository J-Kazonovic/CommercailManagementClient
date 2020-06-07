import { Component, OnInit } from '@angular/core';
import { Facture } from 'src/app/controller/entity/Facture.model';

@Component({
  selector: 'app-facture-list',
  templateUrl: './facture-list.component.html',
  styleUrls: ['./facture-list.component.css']
})
export class FactureListComponent implements OnInit{
factures=new Array<Facture>();
facture=new Facture();
  constructor() { }

  ngOnInit(): void {
  }

}
