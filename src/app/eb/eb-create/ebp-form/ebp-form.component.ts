import { Component, OnInit } from '@angular/core';
import { EbService } from 'src/app/controller/service/eb.service';
import { Eb } from 'src/app/controller/entity/eb.model';
import { Category } from 'src/app/controller/entity/category.model';
import { Ebp } from 'src/app/controller/entity/ebp.model';

@Component({
  selector: 'app-ebp-form',
  templateUrl: './ebp-form.component.html',
  styleUrls: ['./ebp-form.component.css']
})
export class EbpFormComponent implements OnInit {

  constructor(private ebService: EbService) { }

  ngOnInit() {
  }

  onProductAdd(){
    this.ebService.onAddEbp();
  }

  /**Getters & Setters */

  get ebp(): Ebp {
    return this.ebService.ebp;
  }

  /**Getters & Setters */

  /**Util */
  public ebpValidation():boolean{
    return this.ebService.ebpValidation();
  }
  /**Util */

}
