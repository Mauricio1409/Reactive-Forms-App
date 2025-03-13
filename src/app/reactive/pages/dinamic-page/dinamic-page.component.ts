import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-dinamic-page',
  imports: [JsonPipe],
  templateUrl: './dinamic-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DinamicPageComponent { }
