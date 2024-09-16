import { Component } from '@angular/core';
import { AlertsCardComponent } from "../alerts-card/alerts-card.component";
import { DServicesCardComponent } from "../d-services-card/d-services-card.component";

@Component({
  selector: 'app-d-dashboard-page',
  standalone: true,
  imports: [AlertsCardComponent, DServicesCardComponent],
  templateUrl: './d-dashboard-page.component.html',
  styleUrl: './d-dashboard-page.component.scss'
})
export class DDashboardPageComponent {

}
