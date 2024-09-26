import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PrepaidBrowsePlanComponent } from '../../mobile-prepaid/prepaid-browse-plan/prepaid-browse-plan.component';
import { CommonModule } from '@angular/common';
import { MateriallistModule } from '../../../../shared/materiallist/materiallist.module';

@Component({
  selector: 'app-dth-browseplan',
  standalone: true,
  imports: [CommonModule, MateriallistModule],
  templateUrl: './dth-browseplan.component.html',
  styleUrl: './dth-browseplan.component.scss'
})
export class DthBrowseplanComponent {

  BrowsPlanData : any = []; 

  constructor(
    public dialogRef: MatDialogRef<DthBrowseplanComponent>,
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
