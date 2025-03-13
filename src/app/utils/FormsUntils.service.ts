import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormsUntilsService {

  isValidField( form : FormGroup,fieldName : string) : boolean | null {
    return (
          form.controls[fieldName].errors &&
          form.controls[fieldName].touched
        );
  }

  getErrorMessage(form: FormGroup ,fieldName : string) : string | null {
    if(!form.controls[fieldName]) return null;

    const errors = form.controls[fieldName].errors ?? {} ;

    for(const key of Object.keys(errors)){
      switch(key){
        case 'required' : return 'El campo es requerido';

        case 'minlength' : return `Minimo de ${errors['minlength'].requiredLength} caracteres`;

        case 'min' : return `Valor minimo de ${errors['min'].min}`;

      }
    }
    return null
  }

}
