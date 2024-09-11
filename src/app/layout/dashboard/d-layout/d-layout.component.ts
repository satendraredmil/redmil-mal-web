import { Component } from '@angular/core';
import { DHeaderComponent } from "../d-header/d-header.component";
import { DMenuCardComponent } from "../d-menu-card/d-menu-card.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-d-layout',
  standalone: true,
  imports: [DHeaderComponent, DMenuCardComponent, CommonModule],
  templateUrl: './d-layout.component.html',
  styleUrl: './d-layout.component.scss'
})
export class DLayoutComponent {
  mobileMenuOpen = false;
  servicesDropdownOpen = false;
  activeMenu = 'home';  // Default active menu is 'Home'

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  toggleServicesDropdown() {
    this.servicesDropdownOpen = !this.servicesDropdownOpen;
    this.activeMenu = 'services';  // Mark Services as active when clicked
  }

  setActiveMenu(menuItem: string) {
    this.activeMenu = menuItem;  // Set the clicked item as active
    this.servicesDropdownOpen = false;  // Close services dropdown if navigating to another section
  }
}