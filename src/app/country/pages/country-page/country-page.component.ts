import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interfaces';
import { filter, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-country-page',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './country-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CountryPageComponent {

  fb = inject(FormBuilder)

  countryServices = inject(CountryService)

  regions = signal(this.countryServices.regions)

  countryByRegion = signal<Country[]>([])

  borderCountry = signal<Country[]>([])

  myForm = this.fb.group({
    region : ['', Validators.required],
    country : ['', Validators.required],
    border : ['', Validators.required],

  })

  onFormChange = effect((onCleanUp) => {
    const regionSubscription = this.onRegionChange();
    const countrySubscription = this.onCountryChange();

    onCleanUp(() => {
      regionSubscription.unsubscribe();
      countrySubscription.unsubscribe()
    })
  })

  onRegionChange() {
    return this.myForm.get('region')!
    .valueChanges
      .pipe(
        tap(() => this.myForm.get('country')!.setValue('')),
        tap(() => this.myForm.get('border')!.setValue('')),
        tap(() => {
          this.countryByRegion.set([]),
          this.borderCountry.set([])
        }),
        switchMap((region) => {
          return this.countryServices.getCountriesByRegion(region!)
        })
      )
    .subscribe((countries) => {
      this.countryByRegion.set(countries)
    });
  }

  onCountryChange() {
    return this.myForm.get('country')!
    .valueChanges.pipe(
      tap(() => this.myForm.get('border')!.setValue('')),
      filter((value) => value!.length > 0),
      switchMap(code => this.countryServices.getCountryByAlphaCode(code!)),
      switchMap(country =>this.countryServices.getCountryBorderByCode(country.borders))
    )


    .subscribe((borders) => {
      this.borderCountry.set(borders)
    })
  }
}
