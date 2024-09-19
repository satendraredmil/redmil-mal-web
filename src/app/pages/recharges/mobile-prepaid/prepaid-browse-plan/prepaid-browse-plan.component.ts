import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { MateriallistModule } from '../../../../shared/materiallist/materiallist.module';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-prepaid-browse-plan',
  standalone: true,
  imports: [CommonModule, MateriallistModule],
  templateUrl: './prepaid-browse-plan.component.html',
  styleUrl: './prepaid-browse-plan.component.scss'
})
export class PrepaidBrowsePlanComponent {

  @ViewChild('tabsContainer', { static: false }) tabsContainer!: ElementRef;

// Active tab state
  tabs: string[] = ['Smart Offers', 'Combo Plans', 'Unlimited', 'International Roaming', 'Data Add on','Smart Offers_1', 'Combo Plans_1', 'Unlimited_1', 'International Roaming_1', 'Data Add on_1'];
  activeTab: string = this.tabs[0];

 // Search query
 searchQuery: string = '';

 constructor(public dialogRef: MatDialogRef<PrepaidBrowsePlanComponent>){
 }
 
 // Sample plans data
 plans = [
   {
     price: 149,
     validity: 'Validity 28 Days',
     description: 'Get Free Unlimited Voice Calls + 0.5GB/day Data + 300 SMS + Complimentary Subscription to Jio Apps - JioSaavn, JioCinema',
   },
   {
     price: 299,
     validity: 'Validity 56 Days',
     description: 'Get Free Unlimited Voice Calls + 1.5GB/day Data + 500 SMS + Complimentary Subscription to Jio Apps - JioSaavn, JioCinema',
   },
   {
     price: 599,
     validity: 'Validity 84 Days',
     description: 'Get Free Unlimited Voice Calls + 2GB/day Data + 1000 SMS + Complimentary Subscription to Jio Apps - JioSaavn, JioCinema',
   },
   {
    price: 149,
    validity: 'Validity 28 Days',
    description: 'Get Free Unlimited Voice Calls + 0.5GB/day Data + 300 SMS + Complimentary Subscription to Jio Apps - JioSaavn, JioCinema',
  },
  {
    price: 299,
    validity: 'Validity 56 Days',
    description: 'Get Free Unlimited Voice Calls + 1.5GB/day Data + 500 SMS + Complimentary Subscription to Jio Apps - JioSaavn, JioCinema',
  },
  {
    price: 599,
    validity: 'Validity 84 Days',
    description: 'Get Free Unlimited Voice Calls + 2GB/day Data + 1000 SMS + Complimentary Subscription to Jio Apps - JioSaavn, JioCinema',
  },
 ];

 filteredPlans = this.plans;



 selectTab(tab: string): void {
  this.activeTab = tab;
}

scrollTabs(direction: string): void {
  const container = this.tabsContainer.nativeElement;
  const scrollAmount = 100; // Adjust this for smoother/faster scrolling

  if (direction === 'left') {
    container.scrollLeft -= scrollAmount;
  } else {
    container.scrollLeft += scrollAmount;
  }
}





 // Method to search for a plan
 searchPlan() {
  
  //  this.filteredPlans = this.plans.filter(plan =>
  //    plan.description.toLowerCase().includes(this.searchQuery.toLowerCase())
  //  );

  const query = this.searchQuery.toLowerCase();
  this.filteredPlans = this.plans.filter(plan => 
    plan.description.toLowerCase().includes(query) ||
    plan.validity.toLowerCase().includes(query) ||
    plan.price.toString().includes(query)
  );
 }

 // Method to select a plan (you can add more functionality here)
 selectPlan(plan: any) {
   alert(`Plan with price ₹${plan.price} selected`);
   this.dialogRef.close(plan);
 }

}
