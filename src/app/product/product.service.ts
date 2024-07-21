import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  constructor(private http:HttpClient) { }

  //  For Get All List using Fake Api
  GetProductList(category: string):Observable<Product[]>{
    const categoryUrl = category ? `/category/${category}` : ''; 
    return this.http.get<Product[]>(`https://fakestoreapi.com/products${categoryUrl}?sort=desc`);
  }
  //  Add And Update Product Using Fake Api

  AddEditProduct(PostData: any, SelectedProduct:any){
    if(!SelectedProduct){
      return this.http.post('https://fakestoreapi.com/products',PostData);
    }else {
      return this.http.put(`https://fakestoreapi.com/products/${SelectedProduct.id}`,PostData);
    }
  }


  // Delete The Product Using Fake Api

  deleteProduct(ProductId: number){
    return this.http.delete(`https://fakestoreapi.com/products/${ProductId}`);
  }

  getCategories():Observable<string[]>{
    return this.http.get<string[]>('https://fakestoreapi.com/products/categories');
  }
}
