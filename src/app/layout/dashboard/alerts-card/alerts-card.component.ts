import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DashboardService } from '../../../core/services/dashboard/dashboard.service';

@Component({
  selector: 'app-alerts-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alerts-card.component.html',
  styleUrl: './alerts-card.component.scss'
})
export class AlertsCardComponent {

  notificationsData:any[]=[];

  scrollPosition = 0;
  currentIndex = 0;
  scrollInterval: any;

  constructor( private notification_api:DashboardService){}
  

  ngOnInit(): void {
    this.notification_data();
  }


//Api  call to get the notification_data
notification_data(){
  this.notification_api.notification_data().subscribe((res)=>{
    // console.log('dsjhdsjk',res);
    
    // this.notificationsData = res.Data
    // console.log(this.notificationsData);
  
  })
}



startScrolling(): void {
  this.scrollInterval = setInterval(() => {
    this.scrollPosition -= 40; // scroll by 40px, height of one alert

    if (Math.abs(this.scrollPosition) >= this.notificationsData.length * 40) {
      // Reset the position when all alerts have been shown
      this.scrollPosition = 0;
    }
  }, 3000); // Scroll every 3 seconds (adjust as needed)
}

ngOnDestroy(): void {
  if (this.scrollInterval) {
    clearInterval(this.scrollInterval);
  }
}
}
