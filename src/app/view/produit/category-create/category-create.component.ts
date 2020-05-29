import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/controller/service/category.service';
import { Category } from 'src/app/controller/entity/category.model';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent implements OnInit {


  constructor(private cService:CategoryService) { }

  ngOnInit(): void {
  }

  onAddNewCat(){
    this.cService.save();
  }

  isEmptyLibelle(){
    return this.cat.libelle==null;
  } 


  get cat(): Category {
     return this.cService.cat;
  }
}
