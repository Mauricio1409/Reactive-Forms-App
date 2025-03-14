import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormsUntilsService } from '../../../utils/FormsUntils.service';

@Component({
  selector: 'app-dinamic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './dinamic-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DinamicPageComponent {


  private fb = inject(FormBuilder);

  formService = inject(FormsUntilsService)


  myForm : FormGroup = this.fb.group({
    name : ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames : this.fb.array([
      ['Fortnite', Validators.required],
      ['Fifa', Validators.required]
    ], Validators.minLength(3)),

  })

  get favoriteGames(){
    return this.myForm.get('favoriteGames') as FormArray;
  }

  addFavorite = new FormControl('', Validators.required)


  onAddToFavorites() {
    if(this.addFavorite.invalid) return;

    const newGame = this.addFavorite.value;
    this.favoriteGames.push(this.fb.control(newGame, Validators.required))

    this.addFavorite.reset();
  }

  onDeleteFavorite(i : number){
    this.favoriteGames.removeAt(i)
  }



}
