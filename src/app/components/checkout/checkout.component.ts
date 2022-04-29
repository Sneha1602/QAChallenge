import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatStepper} from "@angular/material/stepper";
import {ValidatorService} from "../../services/validator.service";
import {CartService} from "../../services/cart.service";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  public firstFormGroup: FormGroup;
  public secondFormGroup: FormGroup;
  public thirdFormGroup: FormGroup;

  public name: string = '';
  public address: string = '';
  public cardHolder: string = '';
  public cardNumber: string = '';

  public sum: number = 0;

  constructor(private readonly formBuilder: FormBuilder, private readonly validatorService: ValidatorService,
              private readonly cartService: CartService) {
    this.firstFormGroup = this.formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this.formBuilder.group({});
  }

  ngOnInit() {
    this.name = '';
    this.address = '';
    this.cardHolder = '';
    this.cardNumber= '';

    this.sum = ~~(this.cartService.getSum() / 1);
  }

  public validateAddress(stepper: MatStepper) {
    this.validatorService.validateAddress();
    stepper.next();
  }

  public validateCreditCard(stepper: MatStepper) {
    this.validatorService.validateCreditCard();
    stepper.next();
  }
}
