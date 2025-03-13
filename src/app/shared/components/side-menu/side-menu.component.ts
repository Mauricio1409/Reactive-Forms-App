import { ChangeDetectionStrategy, Component } from '@angular/core';
import ReactiveRoutes from '../../../reactive/reactive.routes';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface MenuItem {
  title : string,
  route : string
}

const reactiveItem = ReactiveRoutes[0].children ?? [];

@Component({
  selector: 'app-side-menu',
  imports: [RouterLink, RouterLinkActive,],
  templateUrl: './side-menu.component.html',
})
export class SideMenuComponent {

  reactiveMenu : MenuItem[] = reactiveItem
  .filter(items => items.path !== '**')
  .map((item) => ({
    route : `reactive/${item.path}`,
    title : `${item.title}`
  }));


  authMenu : MenuItem[] = [{
    title : "registro",
    route : './auth'

  }]

  CountryMenu : MenuItem[] = [{
    title : "Paises",
    route : './country'

  }]
}
