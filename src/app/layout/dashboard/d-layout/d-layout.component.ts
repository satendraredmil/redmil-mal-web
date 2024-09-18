import { Component } from '@angular/core';
import { DHeaderComponent } from "../d-header/d-header.component";
import { CommonModule } from '@angular/common';
import { AlertsCardComponent } from "../alerts-card/alerts-card.component";

import { RouterOutlet } from '@angular/router';
import { FooterPageComponent } from "../../../pages/login/footer-page/footer-page.component";

@Component({
  selector: 'app-d-layout',
  standalone: true,
  imports: [DHeaderComponent, CommonModule, AlertsCardComponent, RouterOutlet, FooterPageComponent],
  templateUrl: './d-layout.component.html',
  styleUrl: './d-layout.component.scss'
})
export class DLayoutComponent {
  
}