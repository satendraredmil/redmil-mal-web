import { Component } from '@angular/core';
import { ServiceSliderComponent } from "./service-slider/service-slider.component";
import { ServiceListComponent } from "./service-list/service-list.component";
import { ServiceChartComponent } from "./service-chart/service-chart.component";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-d-services-card',
  standalone: true,
  imports: [ServiceSliderComponent, ServiceListComponent, ServiceChartComponent],
  templateUrl: './d-services-card.component.html',
  styleUrl: './d-services-card.component.scss'
})
export class DServicesCardComponent {


  constructor(private http: HttpClient) { }
  ngOnInit(): void {}



  
}
