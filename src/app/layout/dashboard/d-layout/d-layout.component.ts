import { Component } from '@angular/core';
import { DHeaderComponent } from "../d-header/d-header.component";

@Component({
  selector: 'app-d-layout',
  standalone: true,
  imports: [DHeaderComponent],
  templateUrl: './d-layout.component.html',
  styleUrl: './d-layout.component.scss'
})
export class DLayoutComponent {

}
