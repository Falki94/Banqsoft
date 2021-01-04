import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CalculationService } from './../services/calculation.service';
import { Calculation } from '../models/calculation';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  @Input() loanType: string = 'HousingLoan'; // For future development -> new types of Loan. e.g. carLoan.

  form: FormGroup;
  calculation: Calculation;
  result: number;
  error: boolean;
  loanRate: number;

  constructor(private calculationService: CalculationService, private builder: FormBuilder) { }

  ngOnInit() {
    this.calculationService.Rate(this.loanType).subscribe(
      response => {
        this.loanRate = response;
        this.error = false;
      },
      error => {
        console.error(error.message);
        this.error = true;
      }
    );

    this.form = this.builder.group({
      amount: ['', [Validators.required, Validators.min(1)]],
      rate: [this.loanRate],
      years: ['', [Validators.required, Validators.min(1)]]
    });
  }

  get amount(): any { return this.form.get('amount'); }
  get rate(): any { return this.form.get('rate'); }
  get years(): any { return this.form.get('years'); }

  onSubmit() {
    if (this.form.valid) {
      const calc = Object.assign({}, this.calculation, this.form.value );
      this.calculationService.Calculate(calc, this.loanType).subscribe(
        response => {
          this.calculation = calc;
          this.result = response;
          this.error = false;
        },
        error => {
          console.error(error.message);
          this.error = true;
        }
      );
    }
  }
}
