import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder,FormGroup,ReactiveFormsModule, Validators } from '@angular/forms';
import { FormsUntilsService } from '../../../utils/FormsUntils.service';

@Component({
  selector: 'app-basic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './basic-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicPageComponent {

  formServices = inject(FormsUntilsService)
  private fb = inject(FormBuilder);
  myForm : FormGroup = this.fb.group({
    name: ['', /**Validadores sincornos */[Validators.required, Validators.minLength(3)], /**validadores asincronos */[]],
    price : [0, [Validators.required, Validators.min(10)]],
    inStorage : [0, [Validators.required, Validators.min(0)]]
  })

  // --------------Form Control (Intentar no usar) -------------------//
  // myForm = new FormGroup({
  //   name : new FormControl(''),
  //   price : new FormControl(0),
  //   inStorage : new FormControl(0),

  // })

  onSave() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    this.myForm.reset({
      price : 0,
      inStorage : 0
    })
  }

}
