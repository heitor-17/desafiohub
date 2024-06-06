import { Component } from '@angular/core';
import { PropertyFormComponent } from '../property-form/property-form.component';
import { TreeComponent } from '../tree/tree.component'




    @Component({
      selector: 'app-topbar',
      standalone: true,
      imports: [PropertyFormComponent, TreeComponent],
      templateUrl: './topbar.component.html',
      styleUrl: './topbar.component.css'
    })
    export class TopbarComponent {

    }
