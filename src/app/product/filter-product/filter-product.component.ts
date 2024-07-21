import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-filter-product',
  templateUrl: './filter-product.component.html',
  styleUrls: ['./filter-product.component.css']
})
export class FilterProductComponent implements OnInit {

  @Output() SelectCategory: EventEmitter<string> = new EventEmitter<string>();

  selectedCategory: string = '';
  categories: string[] = [];

  constructor(private ProductService:ProductService){}

  ngOnInit(): void {

    this.getCategories();

  }

  getCategories(){
    this.ProductService.getCategories().subscribe((data)=>{
      this.categories = data;
    })
  }

  onChangeCategory($event: any){
    this.SelectCategory.emit($event.value);
    console.log($event.value);
    
  }

}
