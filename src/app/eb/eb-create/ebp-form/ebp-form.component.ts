import { Component, OnInit } from '@angular/core';
import { EbService } from 'src/app/controller/service/eb.service';
import { Eb } from 'src/app/controller/entity/eb.model';
import { Category } from 'src/app/controller/entity/category.model';
import { Ebp } from 'src/app/controller/entity/ebp.model';
import { CategoryService } from 'src/app/controller/service/category.service';

@Component({
  selector: 'app-ebp-form',
  templateUrl: './ebp-form.component.html',
  styleUrls: ['./ebp-form.component.css']
})
export class EbpFormComponent implements OnInit {
  constructor(private ebService: EbService,private catService: CategoryService) { }
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
  get cats(): Array<Category> {
    return this.catService.cats;
  }
  get cat(): Category {
    return this.catService.cat;
  }
  findCategoryByLibelle(category: Category ) {
    this.catService.findCategoryByLibelle(category);  
  }
  findAll( ) {
    this.catService.findAll();  
  }
}
