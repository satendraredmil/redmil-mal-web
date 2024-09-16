import { Component } from '@angular/core';
import { DHeaderComponent } from "../d-header/d-header.component";
import { CommonModule } from '@angular/common';
import { AlertsCardComponent } from "../alerts-card/alerts-card.component";
import { DFooterComponent } from "../d-footer/d-footer.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-d-layout',
  standalone: true,
  imports: [DHeaderComponent, CommonModule, AlertsCardComponent, DFooterComponent, RouterOutlet],
  templateUrl: './d-layout.component.html',
  styleUrl: './d-layout.component.scss'
})
export class DLayoutComponent {
  
}