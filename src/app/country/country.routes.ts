import { Routes } from '@angular/router';
import CountryPageComponent from './pages/country-page/country-page.component';

export const CountryRoutes: Routes = [
  {
    path: '',
    component : CountryPageComponent
  },
];

export default CountryRoutes;
