import { CommonModule } from '@angular/common';
import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MateriallistModule } from '../../../../shared/materiallist/materiallist.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-prepaid-browse-plan',
  standalone: true,
  imports: [CommonModule, MateriallistModule],
  templateUrl: './prepaid-browse-plan.component.html',
  styleUrl: './prepaid-browse-plan.component.scss'
})
export class PrepaidBrowsePlanComponent {

  BrowsPlanData : any = []; 

  constructor(
    public dialogRef: MatDialogRef<PrepaidBrowsePlanComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.BrowsPlanData = data.BrowsePlan;
    console.log('Received API data:', data.BrowsePlan.Data);
  }

  
  @ViewChild('tabsContainer', { static: false }) tabsContainer!: ElementRef;

  tabs: any[] = [];
  filteredPlans: any[] = [];
  activeTab: string = '';
  allPlans: any[] = []; // Search ke liye sabhi plans store karenge
  searchQuery: string = ''; // Search query store karne ke liye


  ngOnInit() {
   // API response mein se first item ko access karna
   const responseData = this.BrowsPlanData.Data; 
   console.log(responseData);
   // Tabs ko dynamically generate karna, sirf un categories ko jinke data arrays hain aur unme plans hain
   this.tabs = Object.keys(responseData).filter(key => Array.isArray(responseData[key]) && responseData[key].length >= 0);
   // Default active tab set karna
   this.activeTab = this.tabs[0];
   this.updatePlansForActiveTab(responseData);
  }


// Active tab ke basis par plans ko update karna
updatePlansForActiveTab(responseData: any) {
  this.filteredPlans = responseData[this.activeTab];
  this.allPlans=this.filteredPlans;
}

// Tab ko select karna aur plans ko update karna
selectTab(tab: string) {
  this.activeTab = tab;
  console.log(this.activeTab);
  // Response data ko dobara access karke filtered plans update karna
  this.updatePlansForActiveTab(this.BrowsPlanData.Data);
   // Search query reset karna jab tab change ho
   this.searchQuery = '';
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

  // Search functionality
  searchPlan() {
    const query = this.searchQuery.toLowerCase();
    this.filteredPlans = this.allPlans.filter(plan =>
      plan.Desc.toLowerCase().includes(query) ||
      plan.Validity.toLowerCase().includes(query) ||
      plan.Rs.toString().includes(query)
    );
  }

  // Method to select a plan (you can add more functionality here)
  selectPlan(plan: any) {
    this.dialogRef.close(plan);
  }

}
