import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormsUntilsService } from '../../../utils/FormsUntils.service';

@Component({
  selector: 'app-swiches-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './swiches-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwichesPageComponent {


  fb = inject(FormBuilder)

  formServices = inject(FormsUntilsService)

  myForm = this.fb.group({
    gender : ['M', Validators.required],
    wantNotifications : [true],
    termAndConditions : [false, Validators.requiredTrue]
  })

  onSubmit() {
    console.log(this.myForm.value)
    }
}
