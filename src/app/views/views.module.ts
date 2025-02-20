import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsModule } from './products/products.module';
import { OrderModule } from './order/order.module';
import { MainModule } from './main/main.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule, ProductsModule, OrderModule, MainModule, SharedModule
  ]
})
export class ViewsModule { }
