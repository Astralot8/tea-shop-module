import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { RouterLink } from '@angular/router';


@NgModule({
  declarations: [MainComponent],
  imports: [CommonModule, RouterLink],
  exports: [],
})
export class MainModule {}
