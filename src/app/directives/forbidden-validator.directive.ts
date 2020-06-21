import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn } from '@angular/forms';

@Directive({
  selector: '[appForbiddenValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: ForbiddenValidatorDirective, multi: true}]
})
export class ForbiddenValidatorDirective implements Validator{

  @Input('appForbiddenName') forbiddenName: string;

  
  constructor() {
  }

  validate(control: AbstractControl): { [key: string]: any } | null {
    const forbidden = new RegExp(this.forbiddenName).test(control.value);
    return forbidden ? {'forbiddenName': {value: control.value}} : null;
  }

  
}
