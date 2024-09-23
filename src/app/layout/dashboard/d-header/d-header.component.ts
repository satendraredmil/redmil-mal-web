import { Component, ElementRef, HostListener, signal, ViewChild } from '@angular/core';
import { SchangelanguageService } from '../../../core/services/changelanguage/schangelanguage.service';
import { PchangelanguagePipe } from '../../../shared/pipes/changelanguage/pchangelanguage.pipe';
import { MateriallistModule } from '../../../shared/materiallist/materiallist.module';
import { DialogBoxComponent } from '../../../shared/reusable-components/dialog-box/dialog-box.component';
import { MatDialog } from '@angular/material/dialog';
import { AnimationItem } from 'lottie-web';
import { LottieComponent } from 'ngx-lottie';
import { CommonModule } from '@angular/common';
import { DatalimitPipe } from '../../../shared/pipes/datalength/datalimit.pipe';
import { DashboardService } from '../../../core/services/dashboard/dashboard.service';
import { Router } from '@angular/router';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-d-header',
  standalone: true,
  imports: [
    PchangelanguagePipe, 
    MateriallistModule, 
    LottieComponent, 
    DatalimitPipe,
    CommonModule,
    DatalimitPipe
  ],
  templateUrl: './d-header.component.html',
  styleUrl: './d-header.component.scss'
})
export class DHeaderComponent {
  ServiceName: string = 'Dashboard';
  UserNameheaderonset:any = "Ramesh Prashad";
  PlanName:string='';
  GetBalanceData:any[]=[];
  NotificationCount:String='';
  notificationsData:any[]=[];
  notificationsDataPath: string = 'https://api.redmilbusinessmall.com/'; // Path for brand images

  panelOpenState:boolean = false;
  menuOpenState: boolean = false;
  isActive: boolean = false;
  isDarkMode: boolean = false;
  isDropdownOpen = false;
  isDropdownOpenMega = false;  // Variable to track dropdown state
  activeLink: string | null = null; // Track the active link
  isMenuOpen: boolean = false;
  @ViewChild('drawer') drawer!: MatDrawer;


  constructor(
    //public themeService: ThemeService,
    private translationService : SchangelanguageService,
    private dialog : MatDialog,
    private eRef: ElementRef,
    private dashboard_api:DashboardService,
    private route:Router
  ) {
    this.isActive = this.translationService.isActiveLanguage();

    //darktheme active follow theme
    // this.themeService.isActiveTheme$.subscribe(isDark => {
    //   this.isDarkMode = isDark;
    // });
  }

  ngOnInit(): void {

   this.GetUserSubscriptionDetails();
   this.GetUserProfile();
   this.notification_count();
   this.GetContactListStatus();
   this.Getbalance();
   this.notification_data();
   this.notification_update();
  }
 
  

  toggleLanguage() {
    this.isActive = !this.isActive; // Toggle the state
    this.translationService.toggleLanguage();
  }

  // toggleTheme() {
  //   this.themeService.toggleTheme();
  // }

  
// Method to toggle the dropdown visibility
toggleDropdown() {
  this.isDropdownOpen = !this.isDropdownOpen;
  this.isDropdownOpenMega = false;
}

toggleDropdownMega(){
  this.isDropdownOpen = false
  this.isDropdownOpenMega = !this.isDropdownOpenMega

   }
   

setActiveLink(link: string | null) {
  this.activeLink = link;
  this.isDropdownOpen = false; // Optionally close the dropdown on link click
}

@HostListener('document:click', ['$event'])
handleOutsideClick(event: Event) {
  // If the click is outside the dropdown menu, close it
  if (!this.eRef.nativeElement.contains(event.target)) {
    this.isDropdownOpen = false;
    this.isDropdownOpenMega = false;
    this.closeMenu();
  }
}

 // Function to open the menu
 openMenu() {
  this.isMenuOpen = true;
  const navLinks = this.eRef.nativeElement.querySelector('.nav-links');
  if (navLinks) {
    navLinks.style.left = '0'; // Move the menu to the right (open)
  }
}

// Function to close the menu
closeMenu() {
  this.isMenuOpen = false;
  const navLinks = this.eRef.nativeElement.querySelector('.nav-links');
  if (navLinks) {
    navLinks.style.left = '-100%'; // Move the menu to the left (close)
  }
}

//Api Call Start Here for All Dashboard header 
//Api call to get the GetUserSubscriptionDetails
GetUserSubscriptionDetails(){
  this.dashboard_api.GetUserSubscriptionDetails().subscribe((res)=>{
      this.PlanName = res.Data[0].PlanName
  })
}

//Api  call to get the GetUserProfile
GetUserProfile(){
  this.dashboard_api.GetUserProfile().subscribe((res)=>{
    this.UserNameheaderonset = res.Data[0].Name
  })
}

//Api  call to get the notification_count
notification_count(){
  this.dashboard_api.notification_count().subscribe((res)=>{
     this.NotificationCount = res.Data[0].COUNT  
  })
}

//Api  call to get the GetContactListStatus
GetContactListStatus(){
  this.dashboard_api.GetContactListStatus().subscribe((res)=>{
    //console.log("GetContactListStatus", res); 
  })
}

//Api  call to get the Getbalance
Getbalance(){
  this.dashboard_api.Getbalance().subscribe((res)=>{
    this.GetBalanceData = res.Data
  })
}

//Api  call to get the Getbalance
notification_data(){
  this.dashboard_api.notification_data().subscribe((res)=>{
    this.notificationsData = res.Data
  })
}

//Api  call to get the Getbalance
notification_update(){
  this.dashboard_api.notification_update().subscribe((res)=>{
    console.log("Updatenotification",res);
    debugger
  })
}

//Logout Method with remove everthing
RemoveSession_Local(){
  sessionStorage.removeItem('UserLogintoken');
  sessionStorage.removeItem('UserLoginIDfortoken');
  sessionStorage.clear();
  localStorage.clear();
  this.route.navigate(['/login']);
}
}



