import { FormControl } from '@angular/forms';

export class FormValidations {

    static nameValidatorCuston(control: FormControl) {
        const name = control.value;
        return name === '3CON' || name === '3con' ? { nameInvalido: true } : null;
    }
}
