import { Component, OnInit } from '@angular/core';
import { FournisseurService } from 'src/app/controller/service/fournisseur.service';
import { Fournisseur } from 'src/app/controller/entity/fournisseur.model';
import { Input } from '@angular/core';

@Component({
  selector: 'app-fournisseur-create',
  templateUrl: './fournisseur-create.component.html',
  styleUrls: ['./fournisseur-create.component.css']
})
export class FournisseurCreateComponent implements OnInit {

  @Input() isForUpdate=false;

  constructor(private fService:FournisseurService) { }

  ngOnInit(): void {
   
  }

  onFournisseurCreated(){
    this.fService.save();
  }

	public get fournisseur(): Fournisseur {
		return this.fService.fournisseur;
	}
  


}
