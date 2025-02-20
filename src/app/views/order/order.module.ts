import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './order/order.component';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [OrderComponent],
  imports: [CommonModule, RouterLink, ReactiveFormsModule ],
  exports: [ ],
})
export class OrderModule {}
