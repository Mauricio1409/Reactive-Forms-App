import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-swiches-page',
  imports: [JsonPipe],
  templateUrl: './swiches-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwichesPageComponent { }
