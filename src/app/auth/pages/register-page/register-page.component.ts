import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormsUntilsService } from '../../../utils/FormsUntils.service';

@Component({
  selector: 'app-register-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './register-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RegisterPageComponent {


  fb = inject(FormBuilder);

  formServices = inject(FormsUntilsService)

  myForm = this.fb.group({
    name : ['', [Validators.required, Validators.pattern(FormsUntilsService.namePattern)]],
    username : ['' , [Validators.required, Validators.minLength(6), Validators.pattern(FormsUntilsService.notOnlySpacesPattern)]],
    email : ['', [Validators.required, Validators.pattern(FormsUntilsService.emailPattern)],[this.formServices.checkingServerResponse]],
    password : ['', [Validators.required, Validators.minLength(6)]],
    password2 : ['', Validators.required]
  })

  onSubmit() {
    this.myForm.markAllAsTouched();
    console.log(this.myForm.value)
    }
}
