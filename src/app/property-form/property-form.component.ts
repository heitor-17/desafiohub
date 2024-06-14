import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common'; // Adicione esta linha
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-property-form',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './property-form.component.html',
  styleUrl: './property-form.component.css'
})
export class PropertyFormComponent {
  isDivVisible = false;

  toggleDiv() {
    this.isDivVisible = !this.isDivVisible;
  }
}
