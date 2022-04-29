import { Injectable } from '@angular/core';

function sleep(milliseconds: number) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  constructor() { }

  public validateAddress() {
    sleep(Math.random() * 2000);
    return true;
  }

  public validateCreditCard() {
    sleep(Math.random() * 2000);
    return true;
  }
}
