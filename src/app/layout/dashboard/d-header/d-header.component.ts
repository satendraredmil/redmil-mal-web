import { Component, ElementRef, HostListener, signal } from '@angular/core';
import { SchangelanguageService } from '../../../core/services/changelanguage/schangelanguage.service';
import { PchangelanguagePipe } from '../../../shared/pipes/changelanguage/pchangelanguage.pipe';
import { MateriallistModule } from '../../../shared/materiallist/materiallist.module';
import { DialogBoxComponent } from '../../../shared/reusable-components/dialog-box/dialog-box.component';
import { MatDialog } from '@angular/material/dialog';
import { AnimationItem } from 'lottie-web';
import { LottieComponent, AnimationOptions } from 'ngx-lottie';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-d-header',
  standalone: true,
  imports: [PchangelanguagePipe, MateriallistModule, LottieComponent, CommonModule],
  templateUrl: './d-header.component.html',
  styleUrl: './d-header.component.scss'
})
export class DHeaderComponent {
  panelOpenState:boolean = false;
  menuOpenState: boolean = false;

  isActive: boolean = false;
  isDarkMode: boolean = false;
  isDropdownOpen = false;
  isDropdownOpen1 = false;  // Variable to track dropdown state
  activeLink: string | null = null; // Track the active link
  isMenuOpen: boolean = false;



  constructor(
    //public themeService: ThemeService,
    private translationService : SchangelanguageService,
    private dialog : MatDialog,
    private eRef: ElementRef
  ) {
    this.isActive = this.translationService.isActiveLanguage();

    //darktheme active follow theme
    // this.themeService.isActiveTheme$.subscribe(isDark => {
    //   this.isDarkMode = isDark;
    // });
  }


  toggleLanguage() {
    this.isActive = !this.isActive; // Toggle the state
    this.translationService.toggleLanguage();
  }

 
//Animation for Error 
  options: AnimationOptions = {
    path: '/assets/animation/Animation_Pending.json',
  };
  animationCreated(animationItem: AnimationItem): void {
    console.log("hhsdjksasjkda",animationItem);
  }


  // toggleTheme() {
  //   this.themeService.toggleTheme();
  // }

  
// Method to toggle the dropdown visibility
toggleDropdown() {
  this.isDropdownOpen = !this.isDropdownOpen;
  this.isDropdownOpen1 = false
}
// Method to toggle the dropdown visibility
toggleDropdown1() {
this.isDropdownOpen1 = !this.isDropdownOpen1;
this.isDropdownOpen = false
}
setActiveLink(link: string | null) {
  this.activeLink = link;
  this.isDropdownOpen = false; // Optionally close the dropdown on link click
  this.isDropdownOpen1 = false;
}

@HostListener('document:click', ['$event'])
handleOutsideClick(event: Event) {
  // If the click is outside the dropdown menu, close it
  if (!this.eRef.nativeElement.contains(event.target)) {
    this.isDropdownOpen = false;
    this.isDropdownOpen1 = false;
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

}



