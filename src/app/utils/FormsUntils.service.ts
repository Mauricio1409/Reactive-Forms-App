import { Injectable } from '@angular/core';
import { AbstractControl, FormArray, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormsUntilsService {

  static namePattern = '([a-zA-Z]+) ([a-zA-Z]+)';
  static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';

  async sleep() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 2500);
    });
  }

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

  isValidFieldFromArray( form : FormArray,index : number) : boolean | null {
    return (
          form.controls[index].errors &&
          form.controls[index].touched
        );
  }

  getErrorMessageFormArray(form: FormArray ,index : number) : string | null {
    if(form.controls,length === 0) return null;

    const errors = form.controls[index].errors ?? {} ;

    for(const key of Object.keys(errors)){
      switch(key){
        case 'required' : return 'El campo es requerido';

        case 'minlength' : return `Minimo de ${errors['minlength'].requiredLength} caracteres`;

        case 'min' : return `Valor minimo de ${errors['min'].min}`;

      }
    }
    return null
  }

  async checkingServerResponse(control : AbstractControl) : Promise<ValidationErrors | null> {

    await this.sleep()
    const formValue = control.value;

    if (formValue === 'hola@mundo.com') {
      return {
        emailTaken: true,
      };
    }



    return null
  }


}
