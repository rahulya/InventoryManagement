import { Component } from '@angular/core';
import { Customer } from '../Model/customer';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent {
  step = 0;

    setStep(index: number) {
      this.step = index;
    }
  
    nextStep() {
      this.step++;
    }
    prevStep() {
      this.step--;
    }
    SaveCustomer(){
        
    }
}
