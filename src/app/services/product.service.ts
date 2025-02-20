import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderType } from '../../types/order.type';
import { ProductType } from '../../types/product.type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {}

  // getProducts(): Observable<ProductType[]> {
  //   return this.http.get<ProductType[]>('https://testologia.ru/tea');
  // }

  // getProductsWithSearch(param: string){
  //   return this.http.get<ProductType[]>(`https://testologia.ru/tea?search=${param}`);
  // }

  getProduct(id: number): Observable<ProductType> {
    return this.http.get<ProductType>(`https://testologia.ru/tea?id=${id}`);
  }

  createOrder(data: OrderType){
    return this.http.post<{success: number, message?: string}>(`https://testologia.ru/order-tea`, data);
  }

  getProducts(queryParams: string = ''): Observable<ProductType[]>{
    return this.http.get<ProductType[]>('https://testologia.ru/tea' + (queryParams ? ('?search=' + queryParams) : '') );
  }
}
