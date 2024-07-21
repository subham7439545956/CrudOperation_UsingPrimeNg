import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import {HttpClientModule} from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { AddProductModule } from "../add-product/add-product.module";
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, } from 'primeng/api';
import { FilterProductComponent } from './filter-product/filter-product.component';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';





@NgModule({
  declarations: [
    ProductComponent,
    FilterProductComponent
  ],
  imports: [
    CommonModule, HttpClientModule, ButtonModule, TableModule, DialogModule,
    AddProductModule, BrowserAnimationsModule, ToastModule, ConfirmDialogModule, DropdownModule,
    FormsModule
],
  exports:[
    ProductComponent
  ],
  providers: [MessageService,ConfirmationService]
})
export class ProductModule { }
