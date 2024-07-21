import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../product/product.service';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})

export class AddProductComponent implements OnInit, OnChanges {

  @Input() displayAddModal: boolean = true;
  @Input() SelectedProduct: any = null;
  @Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>(); 
  @Output() clickAddEdit: EventEmitter<any> = new EventEmitter<any>();

  modalType = 'Add';
  productForm!: FormGroup;
  selectedFile: File | null = null;

  constructor(private fb:FormBuilder, private ProductService:ProductService, private messageService:MessageService){}

  ngOnChanges(){
    if(this.SelectedProduct){
      this.modalType = 'Edit';
      this.productForm.patchValue(this.SelectedProduct);
    }else{
      this.productForm.reset();
      this.modalType = 'Add';
    }
  }

  ngOnInit(): void {
    this.CallFormControl();
  }

  CallFormControl(){
    this.productForm = this.fb.group({
      title: ['',Validators.compose([Validators.required,Validators.pattern(/^[^\s][\s\S]*$/)])],
      price: ['',Validators.required],
      description: ['',Validators.pattern(/^[^\s][\s\S]*$/)],
      category:  ['',Validators.compose([Validators.required,Validators.pattern(/^[^\s][\s\S]*$/)])],
      image: ['',Validators.compose([Validators.required,Validators.pattern(/^[^\s][\s\S]*$/)])]
    })
  }

  AddEditProduct(){
    console.log(this.productForm.value)
    if(this.productForm.invalid){
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please Enter Required Field' });
      this.productForm.markAllAsTouched(); // Mark all fields as touched to trigger validation messages
      // return; // Prevent further execution
    }else{
      this.ProductService.AddEditProduct(this.productForm.value, this.SelectedProduct).subscribe((data)=>{
        console.log(data)
        this.clickAddEdit.emit(data);
        this.CloseModal();
        const msg = this.modalType === 'Add' ? 'Product added' : 'Product updated';
        this.messageService.add({ severity: 'success', summary: 'Successfully', detail: msg });
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error });
        console.log("Error Occured")
      }
    )

    }

  }

  
  CloseModal(){
    this.clickClose.emit(true);
    this.productForm.reset();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

}
