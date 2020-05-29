import { Component, OnInit } from '@angular/core';
import { AchatService } from 'src/app/controller/service/achat.service';
import { Achat } from 'src/app/controller/entity/achat.model';
import { UtilList } from 'src/app/util/utillist.module';
import { AchatItem } from 'src/app/controller/entity/achat-item.model';
import { AchatItemService } from 'src/app/controller/service/achat-item.service';

@Component({
  selector: 'app-achat-list',
  templateUrl: './achat-list.component.html',
  styleUrls: ['./achat-list.component.css']
})
export class AchatListComponent implements OnInit {

  achats=new Array<Achat>();
  achatUpdate: Achat;
  items=new Array<AchatItem>();


  constructor(private achatService:AchatService
    ,private achatItemService:AchatItemService) { }

  ngOnInit(): void {
    this.getAllAchats()
  }

  oAchatShow(achat:Achat){

    this.achatUpdate = achat;
    this.achatItemService.getAchatItemsByAchat(achat.ref).subscribe(
      data => {
        this.items= data;
      },error=>{
        console.log(error);
      }
    );
  }

  onitemUpdate(){
    this.achatService.updateAchat(this.achatUpdate).subscribe(
      data => {
        if (data == 1) {
         
        }
      }, error => {
        console.log(error);
      }
    )
  }

  onAchatDelete(achat:Achat){
    this.achatService.deleteAchat(achat.id).subscribe(
      data=>{
        if(data==1){
          UtilList.deleteFromListById(achat.id,this.achats);
        }
      },error=>{
        console.log(error);
      }
    )
  }

  onFilterAction(){
    
  }

  getAllAchats(){
    this.achatService.getAllAchat().subscribe(
      data=>{
        this.achats=data;
      },error=>{
        console.log(error);
      }
    )

  }

  onItemDelete(){
    
  }

}
