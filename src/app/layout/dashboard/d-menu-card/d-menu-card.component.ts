import { Component, ElementRef, HostListener } from '@angular/core';
import { MateriallistModule } from '../../../shared/materiallist/materiallist.module';

@Component({
  selector: 'app-d-menu-card',
  standalone: true,
  imports: [MateriallistModule],
  templateUrl: './d-menu-card.component.html',
  styleUrl: './d-menu-card.component.scss'
})
export class DMenuCardComponent {

  isDropdownOpen = false;
  isDropdownOpen1 = false;  // Variable to track dropdown state
  activeLink: string | null = null; // Track the active link


  constructor(private eRef: ElementRef) {}
  
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
    }
  }
}