import { Component, ElementRef, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterPageComponent } from "../../login/footer-page/footer-page.component";
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';
import { MateriallistModule } from '../../../shared/materiallist/materiallist.module';
import { MobilePrepaidService } from '../../../core/services/recharges/mobile-prepaid/mobile-prepaid.service';
import { transactions_report } from '../../../core/models/classes/BaseModel';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-layout-recharge',
  standalone: true,
  imports: [RouterOutlet, FooterPageComponent, LottieComponent, MateriallistModule, DatePipe],
  templateUrl: './layout-recharge.component.html',
  styleUrl: './layout-recharge.component.scss'
})
export class LayoutRechargeComponent {

  isDropdownOpenComm = false;
  isDropdownOpenHow = false;
  isDropdownOpenBus = false;   // Variable to track dropdown state
  activeLink: string | null = null; // Track the active link
  isMenuOpen: boolean = false;

  RecentTransactions: any[]=[];
  Recent_TransactionsDataPath: string = 'https://api.redmilbusinessmall.com/'; // Path for brand images



  constructor(private eRef: ElementRef,private rechargeapi: MobilePrepaidService,) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  this.Maketransactions_recentTransaction();
  }


  // Method to toggle the dropdown visibility
  toggleDropdownComm() {
    this.isDropdownOpenComm = !this.isDropdownOpenComm;
    this.isDropdownOpenHow = false;
    this.isDropdownOpenBus = false;
  }
  // Method to toggle the dropdown visibility
  toggleDropdownHow() {
    this.isDropdownOpenHow = !this.isDropdownOpenHow;
    this.isDropdownOpenComm = false;
    this.isDropdownOpenBus = false;
  }
  // Method to toggle the dropdown visibility
  toggleDropdownBus() {
    this.isDropdownOpenBus = !this.isDropdownOpenBus;
    this.isDropdownOpenHow = false;
    this.isDropdownOpenComm = false;
  }

  // toggleDropdown(dropdownName: string) {
  //   this.dropdownName = !this.dropdownName;
  // }

  @HostListener('document:click', ['$event'])
  handleOutsideClick(event: Event) {
    // If the click is outside the dropdown menu, close it
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.isDropdownOpenBus = false;
      this.isDropdownOpenComm = false;
      this.isDropdownOpenHow = false;
    }
  }


  //Animation for Error
  options: AnimationOptions = {
    path: '/assets/animation/Recharge_Animation_highest.json',
  };

  animationCreated(animationItem: AnimationItem): void {
    // console.log("hhsdjksasjkda",animationItem);
  }


  Maketransactions_recentTransaction(): void{
    const transactions_recentTransactionData: transactions_report = new transactions_report(0,'','', 'desc','MobilePrepaid');
    this.rechargeapi.transactions_recentTransaction(transactions_recentTransactionData).subscribe((res)=>{
      console.log('Recent Transaction', res);
      this.RecentTransactions = res.Data
      if (res.Statuscode === "TXN" && res.Data) {
        this.RecentTransactions = res.Data.map((item:any) => {
          // Status ke hisaab se image path set karna
          if (item.Status === 'Success') {
            item.StatusImage = '/assets/images/dashboard/transaction_succes.png'; // Success image ka path
          } else if (item.Status === 'Failure') {
            item.StatusImage = '/assets/images/dashboard/transaction_failed.png'; // Failure image ka path
          } else{
            item.StatusImage = '/assets/images/dashboard/transaction_pending.png'; // Default image
          }
          return item; // Updated item return karna
        });
      } else {
        console.error('Failed to fetch data:', res.Message); // Error handling
      }
    },
    (error) => {
      console.error('Error fetching transactions:', error); // Error handling for HTTP call
    }
  );
}
}
