import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { tap } from 'rxjs';
import { ProductType } from '../../../../types/product.type';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-product',
  standalone: false,
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  product: ProductType;
  loading: boolean = false;
  constructor(
    private productsService: ProductService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.product = {
      id: 0,
      image: '',
      title: '',
      price: 0,
      description: '',
    }

  }
  
  ngOnInit(): void {
    this.loading = true
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      if (params['id']) {
        this.productsService.getProduct(+params['id']).pipe(tap(()=> {
          this.loading = false
        })).subscribe({
          next: (data)=>{
            this.product = data
          },
          error: (error)=> {
            this.router.navigate(['/'])
          }
        });
      }
    });
  }
}
