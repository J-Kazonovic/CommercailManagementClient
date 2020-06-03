import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/controller/service/product.service';
import { Product } from 'src/app/controller/entity/product.model';
import { UtilList } from 'src/app/util/utillist.module';
import { CategoryService } from 'src/app/controller/service/category.service';
import { UniteService } from 'src/app/controller/service/unite.service';
import { Category } from 'src/app/controller/entity/category.model';
import { Unite } from 'src/app/controller/entity/unite.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {


  page=0;
  pages:Array<number>;

  products=new Array<Product>();
  productsFiltered=new Array<Product>();


  catLib="";
  uniteLib="";
  searchKey="";


  constructor(private catService: CategoryService
    , private pService: ProductService
    , private uService: UniteService) { }

  ngOnInit(): void {
    this.getAllProducts();
    this.getAllCats();
    this.getAllUnites();
  }


  onFilterAction() {
    this.productsFiltered = this.products;
    this.productsFiltered=this.pService.searchByLibelle(this.productsFiltered,this.searchKey);
    this.productsFiltered = this.pService.filterByCat(this.productsFiltered, this.catLib);
    this.productsFiltered = this.pService.filterByUnite(this.productsFiltered, this.uniteLib);
  }


  getClickedProduct(p: Product) {
    this.pService.product = p;
  }

  onProductDelete(id: number) {
    this.pService.delete(id).subscribe(
      data => {
        if (data == 1) {
          UtilList.deleteFromListById(id, this.products);
        }
      }, error => {
        console.log(error);
      }
    );
  }

  onProductEdit() {
    this.pService.update(this.pService.product).subscribe(
      data => {
        console.log(data);
        if (data == 1) {

        }
      }, error => {
        console.log(error);
      }
    )
  }


  setPage(i:number,event:any){
    event.preventDefault()
    this.page=i;
    this.getAllProducts();
  }


  getAllProducts() {
    this.pService.getAllProducts(this.page).subscribe(
      data => {
        console.log(data);
        this.products = data["content"];
        this.productsFiltered = data["content"];
        this.pages=new Array(data["totalPages"]);

      }, error => {
        console.log(error);
      }
    );
  }
  getAllUnites() {
    this.uService.findAll();
  }
  getAllCats() {
    this.catService.findAll();
  }


  get cats(): Array<Category> {
    return this.catService.cats;
  }
  get cat(): Category {
    return this.catService.cat;
  }

  get unite(): Unite {
    return this.uService.unite;
  }

  get unites(): Array<Unite> {
    return this.uService.unites;
  }

  public get catProduitsList(): Array<Product> {
    return this.pService.catProduitsList;
  }


}
