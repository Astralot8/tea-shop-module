import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, tap } from 'rxjs';
import { ProductType } from '../../../../types/product.type';
import { SearchService } from '../../../services/search.service';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit, OnDestroy {
  loading: boolean = false;
  productsArray: ProductType[] = [];

  public productsTitle: string;

  private _subj: Subscription | null = null;

  constructor(
    private router: Router,
    private productsService: ProductService,
    private searchService: SearchService
  ) {
    this.productsTitle = '';
  }

  ngOnInit(): void {
    this._subj = this.searchService.searchValue$.subscribe((search: string) => {
      this.loading = true;
      this.productsService
        .getProducts(search)
        .pipe(
          tap(() => {
            this.loading = false;
          })
        )
        .subscribe({
          next: (data) => {
            this.productsArray = data;
            let tempArray = this.productsArray.find((item) => {
              return item.title.toLowerCase().includes(search.toLowerCase());
            });
            if (search === '') {
              this.productsTitle = 'Наши чайные коллекции';
            } else if (
              tempArray?.title.toLowerCase().includes(search.toLowerCase())
            ) {
              this.productsTitle = 'Результаты поиска по запросу: ' + search;
            } else {
              this.productsTitle =
                'По запросу: ' + search + '. Ничего не найдено!';
            }
          },
          error: (error) => {
            console.log(error);
            this.router.navigate(['/']);
          },
        });
    });
  }

  ngOnDestroy(): void {
    this._subj?.unsubscribe();
  }
}
