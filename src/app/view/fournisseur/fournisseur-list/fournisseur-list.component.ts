import { Component, OnInit } from '@angular/core';
import { FournisseurService } from 'src/app/controller/service/fournisseur.service';
import { Fournisseur } from 'src/app/controller/entity/fournisseur.model';
import { UtilList } from 'src/app/util/utillist.module';

@Component({
  selector: 'app-fournisseur-list',
  templateUrl: './fournisseur-list.component.html',
  styleUrls: ['./fournisseur-list.component.css']
})
export class FournisseurListComponent implements OnInit {

  f=new Fournisseur();
  fournisseurList= new Array<Fournisseur>();
  searchKey:string;


  constructor(private fService:FournisseurService) { }

  ngOnInit(): void {
    this.getAllFournisseurs();
  }

  getClickedFourni(f:Fournisseur){
    this.fService.fournisseur=f;
  }

  onFourniDelete(f:Fournisseur){
    this.fService.delete(f).subscribe(
      data=>{
        if(data==1){
          UtilList.deleteFromListById(f.id,this.fournisseurList);
        }
      },error=>{
        console.log(error);
      }
    );
  }

  onFourniEdit(){
    this.fService.update(this.fService.fournisseur).subscribe(
      data=>{
        console.log(data);
        if(data==1){
          
        }
      },error=>{
        console.log(error);
      }
    )
  }

  onFournisseurSearch(){
    if(this.searchKey.length>0){
    this.fService.searchByTerm(this.searchKey).subscribe(
      data => {
        this.fournisseurList = data;
      }, error => {
        console.log(error);
      }
    );
    }else{
      this.getAllFournisseurs();
    }
  }

  getAllFournisseurs(){
     this.fService.getAllFournisseur().subscribe(
      data => {
        this.fournisseurList = data;
      }, error => {
        console.log(error);
      }
    );
  }

 
  

}
