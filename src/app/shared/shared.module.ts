import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductComponent } from './components/product/product.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ProductComponent,
  ],
  imports: [
    CommonModule,  RouterLink, RouterLinkActive, FormsModule
  ],
  exports: [
    CurrencyPipe,
    HeaderComponent,
    FooterComponent,
    ProductComponent,
  ]
})
export class SharedModule { }
