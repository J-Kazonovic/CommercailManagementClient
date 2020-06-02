import { Component, OnInit } from '@angular/core';
import { AchatService } from 'src/app/controller/service/achat.service';
import { Achat } from 'src/app/controller/entity/achat.model';
import { UtilList } from 'src/app/util/utillist.module';
import { AchatItem } from 'src/app/controller/entity/achat-item.model';
import { AchatItemService } from 'src/app/controller/service/achat-item.service';
import { Router, ActivatedRoute } from '@angular/router';

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
    ,private achatItemService:AchatItemService
    ,private route: ActivatedRoute
    ,private router: Router) { }

  ngOnInit(): void {
    this.getAllAchats()
  }

  onAchatShow(achat:Achat){
    this.router.navigate(['comptable/achats',achat.ref]);
    this.achatService.achat=achat;
    console.log(this.achatService.achat);

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

  get achat(): Achat {
    return this.achatService.achat;
  }

  set achat(achat: Achat) {
    this.achatService.achat = achat;
  }

}
