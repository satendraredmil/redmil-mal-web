import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { PchangelanguagePipe } from '../../../../shared/pipes/changelanguage/pchangelanguage.pipe';
import { ServiceSliderComponent } from "../service-slider/service-slider.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-service-list',
  standalone: true,
  imports: [
    CommonModule, 
    PchangelanguagePipe, 
    ServiceSliderComponent,
    RouterLink
  ],
  templateUrl: './service-list.component.html',
  styleUrl: './service-list.component.scss'
})
export class ServiceListComponent {
  @Output() formSelected = new EventEmitter<string>();

  selectForm(formType: string) {
    this.formSelected.emit(formType); // Emit the selected form type
  }
  
  All_services=[
    {
      "name": "Recharges",
      "List_of_recharges":[
        {
          "Urlbase":"/recharge/mobile-prepaid",
          "message_eran":"Earn upto 6%",
          "center_image":"/assets/images/dashboard/Recharge_Prepaid.svg",
          "bottom_text":"Mobile Prepaid",
          "classadd":"top-text",
          status:true
        },
        {
          "Urlbase":"/recharge/mobile-postpaid",
          "message_eran":"",
          "center_image":"/assets/images/dashboard/mobile_postpaid.svg",
          "bottom_text":"Mobile Postpaid",
           
        },
        {
          "Urlbase":"/recharge/dth-recharge",
          "message_eran":"",
          "center_image":"/assets/images/dashboard/DTH.svg",
          "bottom_text":"DTH Recharge"
        },
        {
          "Urlbase":"/recharge/fastag-recharge",
          "message_eran":"",
          "center_image":"/assets/images/dashboard/fastag_recharge.svg",
          "bottom_text":"Fastag Recharge"
        },
        {
          "Urlbase":"",
          "message_eran":"",
          "center_image":"/assets/images/dashboard/BBPS.svg",
          "bottom_text":"BBPS"
        }
        // {
        //   "Urlbase":"",
        //   "message_eran":"Earn upto 6%",
        //   "center_image":"/assets/images/dashboard/Mobile-Prepaid.png",
        //   "bottom-text":"Mobile Prepaid"
        // }
      ]
    },


    {
      "name": "Banking Services",
      "List_of_recharges":[
        {
          "Urlbase":"/mobile-prepaid",
          "message_eran":"Earn upto Rs. 15",
          "center_image":"/assets/images/dashboard/Mobile-Prepaid.png",
          "bottom_text":"Aadhaar ATM",
          "classadd":"top-text",
          status:true
        },
        {
          "Urlbase":"",
          "message_eran":"",
          "center_image":"/assets/images/dashboard/Mobile-Postpaid.png",
          "bottom_text":"DMT Yes Bank"
        },
        {
          "Urlbase":"",
          "message_eran":"",
          "center_image":"/assets/images/dashboard/DTH.png",
          "bottom_text":"DMT"
        },
        {
          "Urlbase":"",
          "message_eran":"",
          "center_image":"/assets/images/dashboard/Fastag.png",
          "bottom_text":"Micro ATM"
        },
        {
          "Urlbase":"",
          "message_eran":"",
          "center_image":"/assets/images/dashboard/Mobile-Prepaid.png",
          "bottom_text":"Saving Accounts"
        },
        {
          "Urlbase":"",
          "message_eran":"Coming Soon",
          "center_image":"/assets/images/dashboard/Mobile-Prepaid.png",
          "bottom_text":"Salary Accounts",
          "classadd":"top-text-coming ",
          status:true
        }
      ]
    }
  ]
}
