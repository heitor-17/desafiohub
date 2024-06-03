import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopbarComponent } from './topbar/topbar.component';
import { PropertyFormComponent } from './property-form/property-form.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TopbarComponent,PropertyFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'desafio';
}
