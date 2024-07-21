import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { Product } from './product';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products: Product[] = [];
  displayAddModal = false;
  SelectedProduct: any = null;
  
  constructor(private ProductService:ProductService, private ConfirmationService:ConfirmationService, private MessageService:MessageService){}

  ngOnInit(): void {
    this.GetProduct()
  }

  // Get All Product List

  GetProduct(category?: string){
    this.ProductService.GetProductList(category || '').subscribe((data)=>{
      console.log(data)
      this.products = data
    })
  }

  ShowAddModal(){
    this.displayAddModal = true;
    this.SelectedProduct = null;

  }

  
  hideAddModal(isClosed:boolean){

    this.displayAddModal = !isClosed;

  }

  SaveOrUpdateProductToList(NewData: any){
    console.log(NewData);
    if(this.SelectedProduct && NewData.id === this.SelectedProduct.id){
      const productIndex = this.products.findIndex(data => data.id === NewData.id);
      this.products[productIndex] = NewData;

    }else{
      this.products.unshift(NewData);
    }

    // this.GetProduct();
  }

  ShowEditProduct(product: Product){
    this.displayAddModal = true;
    this.SelectedProduct = product;

  }

  deleteProduct(product: Product){
    this.ConfirmationService.confirm({
      message: 'Are you sure that you want to delete this product?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.ProductService.deleteProduct(product.id).subscribe((data)=>{
          this.products = this.products.filter(data=>data.id != product.id);
          this.MessageService.add({ severity: 'success', summary: 'Success', detail: 'Deleted Successfully'});
        },
        error =>{
          this.MessageService.add({ severity: 'error', summary: 'Error', detail: error});
        }
      )
      }
      
  });

  }

  // For Drop-Dwon Searching

  getProductsByCategory(category: string){
    this.GetProduct(category);
  }


}
