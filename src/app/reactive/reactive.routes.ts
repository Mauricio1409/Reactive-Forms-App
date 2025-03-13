import { Routes } from '@angular/router';
import { BasicPageComponent } from './pages/basic-page/basic-page.component';
import { DinamicPageComponent } from './pages/dinamic-page/dinamic-page.component';
import { SwichesPageComponent } from './pages/swiches-page/swiches-page.component';

export const ReactiveRoutes: Routes = [
  {
    path: '',
    children : [
      {
        path : 'basic',
        title : 'basicos',
        component : BasicPageComponent,
      },
      {
        path : 'dinamic',
        title : 'dinamicos',
        component : DinamicPageComponent,
      },
      {
        path : 'swich',
        title : 'switches',
        component : SwichesPageComponent
      },
      {
        path : '**',
        redirectTo: 'basic'
      }


    ]
  },
];

export default ReactiveRoutes;
