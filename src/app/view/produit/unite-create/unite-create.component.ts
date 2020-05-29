import { Component, OnInit } from '@angular/core';
import { UniteService } from 'src/app/controller/service/unite.service';
import { Unite } from 'src/app/controller/entity/unite.model';

@Component({
  selector: 'app-unite-create',
  templateUrl: './unite-create.component.html',
  styleUrls: ['./unite-create.component.css']
})
export class UniteCreateComponent implements OnInit {

  constructor(private uService:UniteService) { }

  ngOnInit(): void {
  }

  onAddNewUnite(){
    this.uService.save();
  }


  get unite(): Unite {
     return this.uService.unite;
  }
}
