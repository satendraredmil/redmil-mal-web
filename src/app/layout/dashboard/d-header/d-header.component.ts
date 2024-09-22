import { Component, ElementRef, HostListener, signal } from '@angular/core';
import { SchangelanguageService } from '../../../core/services/changelanguage/schangelanguage.service';
import { PchangelanguagePipe } from '../../../shared/pipes/changelanguage/pchangelanguage.pipe';
import { MateriallistModule } from '../../../shared/materiallist/materiallist.module';
import { DialogBoxComponent } from '../../../shared/reusable-components/dialog-box/dialog-box.component';
import { MatDialog } from '@angular/material/dialog';
import { AnimationItem } from 'lottie-web';
import { LottieComponent, AnimationOptions } from 'ngx-lottie';
import { CommonModule } from '@angular/common';
import { DatalimitPipe } from '../../../shared/pipes/datalength/datalimit.pipe';
import { BaseModel_1, BaseModel_3 } from '../../../core/models/classes/BaseModel';
import { DashboardService } from '../../../core/services/dashboard/dashboard.service';

@Component({
  selector: 'app-d-header',
  standalone: true,
  imports: [
    PchangelanguagePipe, 
    MateriallistModule, 
    LottieComponent, 
    DatalimitPipe,
    CommonModule],
  templateUrl: './d-header.component.html',
  styleUrl: './d-header.component.scss'
})
export class DHeaderComponent {

  UserNameheaderonset:any = "Ramesh Prashad";
  PlanName:string='';
  NotificationCount:String='';
  panelOpenState:boolean = false;
  menuOpenState: boolean = false;

  isActive: boolean = false;
  isDarkMode: boolean = false;
  isDropdownOpen = false;
  isDropdownOpenMega = false;  // Variable to track dropdown state
  activeLink: string | null = null; // Track the active link
  isMenuOpen: boolean = false;
  



  constructor(
    //public themeService: ThemeService,
    private translationService : SchangelanguageService,
    private dialog : MatDialog,
    private eRef: ElementRef,
    private dashboard_api:DashboardService
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
   //this.GetContactListStatus();
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


//Api  call to get the menu data
GetUserSubscriptionDetails(){
  this.dashboard_api.GetUserSubscriptionDetails().subscribe((res)=>{
      this.PlanName = res.Data[0].PlanName
  })
}



//Api  call to get the menu data
GetUserProfile(){
  const UserLogintoken = sessionStorage.getItem('UserLogintoken')?.toString();
  const UserLoginIDfortoken = sessionStorage.getItem('UserLoginIDfortoken')?.toString();
  const GetUserProfileData: BaseModel_3 = new BaseModel_3(UserLogintoken,UserLoginIDfortoken);
  this.dashboard_api.GetUserProfile(GetUserProfileData).subscribe((res)=>{
    this.UserNameheaderonset = res.Data[0].Name
  })
}

//Api  call to get the menu data
notification_count(){
  const UserLogintoken = sessionStorage.getItem('UserLogintoken')?.toString();
  const UserLoginIDfortoken = sessionStorage.getItem('UserLoginIDfortoken')?.toString();
  const notification_countData: BaseModel_3 = new BaseModel_3(UserLogintoken,UserLoginIDfortoken);
  this.dashboard_api.notification_count(notification_countData).subscribe((res)=>{
     this.NotificationCount = res.Data[0].COUNT  
  })
}

//Api  call to get the menu data
GetContactListStatus(){
  const UserLogintoken = sessionStorage.getItem('UserLogintoken')?.toString();
  const UserLoginIDfortoken = sessionStorage.getItem('UserLoginIDfortoken')?.toString();
  const GetContactListStatusData: BaseModel_1 = new BaseModel_1(UserLogintoken,UserLoginIDfortoken);
  this.dashboard_api.GetContactListStatus(GetContactListStatusData).subscribe((res)=>{
    console.log("kjgjd", res);
    
  })
}

}



