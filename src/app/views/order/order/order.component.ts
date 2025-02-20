import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Params, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { OrderType } from '../../../../types/order.type';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-order',
  standalone: false,
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent implements OnInit {
  public orderForm: FormGroup;
  orderStatus: string | null = null;
  subscriptionTitle: Subscription | null = null;

  private orderlist!: OrderType;

  @ViewChild('formContainer')
  private formContainer!: ElementRef;
  @ViewChild('successMassage')
  private successMassage!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private productService: ProductService
  ) {
    this.orderForm = this.fb.group({
      productName: ['', [Validators.required]],
      comment: [''],
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern(/^[а-яА-Я]+$/),
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern(/^[а-яА-Я]+$/),
        ],
      ],
      phone: [
        '',
        [Validators.required, Validators.pattern(/^(\+\d{1,3})?\d{11}$/)],
      ],
      country: ['', [Validators.required]],
      zipCode: [
        '',
        [Validators.required, Validators.pattern(/^\d{6}(?:[-\s]\d{4})?$/)],
      ],
      address: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[а-яА-Я-\s\d\/]+$/),
        ],
      ],
    });
  }
  ngOnInit(): void {
    this.subscriptionTitle = this.activatedRoute.queryParams.subscribe(
      (params: Params) => {
        if (params['product']) {
          console.log(this.orderForm.get('productName'))

          this.orderForm.patchValue({
        
            productName: params['product'],
          });
          this.orderForm.get('productName')?.disable();
        }
      }
    );
  }

  get productName() {
    return this.orderForm.get('productName');
  }
  get firstName() {
    return this.orderForm.get('firstName');
  }
  get lastName() {
    return this.orderForm.get('lastName');
  }
  get phone() {
    return this.orderForm.get('phone');
  }
  get country() {
    return this.orderForm.get('country');
  }
  get zipCode() {
    return this.orderForm.get('zipCode');
  }
  get address() {
    return this.orderForm.get('address');
  }
  get comment() {
    return this.orderForm.get('comment');
  }

  submitOrder() {
    if (this.orderForm.invalid) {
      this.orderStatus =
        'Ошибка создани заказа, проверьте заполение полей формы!';
      return;
    }
    this.orderStatus = 'Отправка заказа...';
    setTimeout(() => {
      if (this.orderForm.valid) {
        this.orderlist = {
          name: this.firstName?.value,
          last_name: this.lastName?.value,
          phone: this.phone?.value,
          country: this.country?.value,
          zip: this.zipCode?.value,
          product: this.productName?.value,
          address: this.address?.value,
          comment: this.comment?.value,
        };
      }

      this.productService.createOrder(this.orderlist).subscribe((response) => {
        if (response.success === 1) {
          this.formContainer.nativeElement.classList.add('d-none');
          this.successMassage.nativeElement.classList.remove('d-none');
        } else {
          this.orderStatus = 'Произошла ошибка. Попробуйте еще раз.';
          setTimeout(()=> {
            this.orderStatus = '';
          }, 3000)
          
        }
      });
      this.orderForm.reset();
    }, 5000);
  }
}
