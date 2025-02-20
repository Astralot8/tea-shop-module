import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ProductsComponent } from './products/products.component';
import { RouterLink } from '@angular/router';

@NgModule({
  declarations: [ProductsComponent],
  imports: [CommonModule, RouterLink, CurrencyPipe],
  exports: [],
})
export class ProductsModule {}
