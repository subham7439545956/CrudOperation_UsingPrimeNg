import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddProductComponent } from './add-product.component';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToastModule } from 'primeng/toast';
import { FileUploadModule } from 'primeng/fileupload';
import { MessagesModule } from 'primeng/messages';



@NgModule({
  declarations: [AddProductComponent],
  imports: [
    CommonModule, ButtonModule, TableModule, DialogModule, BrowserAnimationsModule, ReactiveFormsModule,
    InputTextModule, InputNumberModule, InputTextareaModule, ToastModule, FileUploadModule, MessagesModule
  ],
  exports:[
    AddProductComponent
  ]
})
export class AddProductModule { }
