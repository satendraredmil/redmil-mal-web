import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-service-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './service-list.component.html',
  styleUrl: './service-list.component.scss'
})
export class ServiceListComponent {

  All_services=[
    {
      "name": "Recharges",
      "List_of_recharges":[
        {
          "Urlbase":"",
          "message_eran":"Earn upto 6%",
          "center_image":"/assets/images/dashboard/Mobile-Prepaid.png",
          "bottom_text":"Mobile Prepaid",
          "classadd":"top-text",
          status:true
        },
        {
          "Urlbase":"",
          "message_eran":"",
          "center_image":"/assets/images/dashboard/Mobile-Postpaid.png",
          "bottom_text":"Mobile Postpaid",
           
        },
        {
          "Urlbase":"",
          "message_eran":"",
          "center_image":"/assets/images/dashboard/DTH.png",
          "bottom_text":"DTH Recharge"
        },
        {
          "Urlbase":"",
          "message_eran":"",
          "center_image":"/assets/images/dashboard/Fastag.png",
          "bottom_text":"Fastag Recharge"
        },
        {
          "Urlbase":"",
          "message_eran":"",
          "center_image":"/assets/images/dashboard/Mobile-Prepaid.png",
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
          "Urlbase":"",
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
          "bottom_text":"DMT 2.0"
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
