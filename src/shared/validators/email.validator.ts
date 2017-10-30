import { FormControl } from '@angular/forms';
import { ValidationResult } from '../interfaces';

export class EmailValidator {

    public static isValid(control: FormControl): ValidationResult {
        var email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        let valid = email.test(control.value);

        if (!valid) {
            return { isValid: true };
        }
        return null;
    }
}
