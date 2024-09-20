import { Component, ElementRef } from '@angular/core';
import { ServiceSliderComponent } from "../../../layout/dashboard/d-services-card/service-slider/service-slider.component";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MateriallistModule } from '../../../shared/materiallist/materiallist.module';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { PrepaidBrowsePlanComponent } from './prepaid-browse-plan/prepaid-browse-plan.component';
import { AnimationItem } from 'lottie-web';
import { LottieComponent, AnimationOptions } from 'ngx-lottie';
import { FastagRechargeComponent } from "../fastag-recharge/fastag-recharge.component";
import { FooterPageComponent } from "../../login/footer-page/footer-page.component";
import { MobilePrepaidService } from '../../../core/services/recharges/mobile-prepaid/mobile-prepaid.service';
import { Recharges } from '../../../core/models/classes/recharges/MobileRecharge';

@Component({
  selector: 'app-mobile-prepaid',
  standalone: true,
  imports: [
    ServiceSliderComponent,
    MateriallistModule,
    CommonModule,
    LottieComponent,
    FastagRechargeComponent,
    FooterPageComponent
],
  templateUrl: './mobile-prepaid.component.html',
  styleUrl: './mobile-prepaid.component.scss'
})
export class MobilePrepaidComponent {

  mobileForm!: FormGroup;
  operators:any[] = []; // Aap apne operators yahan daal sakte hain
  circles: any[] =[]; // Aap apne operators yahan daal sakte hain
  circles_1 = ['UP West and Uttaranchal', 'Delhi', 'Vodafone', 'BSNL']; // Aap apne operators yahan daal sakte hain
  operatorFilled = false;
  pricePlan:string =''
  Id:any = [];
  Circle:string = "";
  OpId:string =""
  operatorsData:any[]=[];
  circleData:any[]=[];
  
  
  

  constructor(
    private fb: FormBuilder, 
    private http: HttpClient,
    private dialog:MatDialog,
    private eRef: ElementRef,
    private rechargeapi:MobilePrepaidService
  ) { }

  ngOnInit(): void {
    this.mobileForm = this.fb.group({
      operator: ['', Validators.required], // Dropdown for operator
      mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]], // 10 digit validation
      circle: ['', Validators.required], // Dropdown for operator
      amount: ['', [Validators.required, Validators.min(1)]], // Amount input validation
    });

    const MobileRecharge: Recharges = new Recharges();
    this.rechargeapi.GetOperaterList(MobileRecharge).subscribe((res)=>{
      debugger
      console.log("GetOperaterList", res.Data);
      this.Id = res.Data.Id
      this.operators = res.Data;
    });

    const GetCircleListData: Recharges = new Recharges();
    this.rechargeapi.GetCircleList(GetCircleListData).subscribe((res)=>{
      debugger
      console.log("GetCircleList", res);
      if (res.Data && res.Data.length > 0) {
        this.circles = res.Data;
      }
     
    });
  }

  
  // First API to get circle data
  getCircleList() {
    const GetCircleListData: Recharges = new Recharges();
    this.rechargeapi.GetCircleList(GetCircleListData).subscribe((res) => {
      console.log('GetCircleList Response:', res);
      if (res.Data && res.Data.circle) {
        this.circles = [res.Data.circle]; // If circle exists, store it in the array
      }
    });
  }
  

// Function to call API when mobile number is entered completely
onMobileNumberChange() {
  const mobileNumber = this.mobileForm.get('mobileNumber')?.value;

  const MobileRecharge: Recharges = new Recharges(mobileNumber);

  if (mobileNumber.length === 10) {
     // Call the API when 10 digits are entered
     debugger
     this.rechargeapi.MyPayStoreGetCircle(MobileRecharge).subscribe((res)=>{
      console.log(res);
      this.operatorsData = res.Data

      // Circle data ko nikal kar set kar rahe hain
      if (res.Data && res.Data.circle) {
        this.Circle = res.Data.circle; // Yaha 'circle' ko set kar rahe hain jo ngModel ke sath bind hai
        console.log(this.Circle);
      }

     });
  }
}


 // Method to handle the selected value
 onOperatorChange(): void {
  console.log('Selected Operator:', this.OpId);
  // Perform any additional logic with selected value
}
 // Method to handle the selected value
 onCircleChange(selectedCircle: any): void {
 this.Circle = selectedCircle;
  console.log('Selected Operator:', this.Circle);
  // Perform any additional logic with selected value
}

browsePlan() {
  //alert('Browse Plan functionality goes here');
  const UserLogintoken = sessionStorage.getItem('UserLogintoken')?.toString();
  const UserLoginIDfortoken  = sessionStorage.getItem('UserLoginIDfortoken')?.toString();
debugger
  const MyPayStoreBrowsPlansData: Recharges = new Recharges(this.mobileForm.get('mobileNumber')?.value, this.Circle,   UserLogintoken, UserLoginIDfortoken, this.OpId,);
  this.rechargeapi.MyPayStoreBrowsPlans(MyPayStoreBrowsPlansData).subscribe((res)=>{
    console.log("Plan", res);
  })
  const dialogRef = this.dialog.open(PrepaidBrowsePlanComponent);

  dialogRef.afterClosed().subscribe(result => {
    if(result){
      console.log(`Dialog result: ${result.price}`);
      console.log(`Dialog result: ${result.validity}`);
      this.mobileForm.patchValue({amount:result.price})
    }
  });
}

onSubmit() {
  if (this.mobileForm.valid) {
    console.log('Form Submitted', this.mobileForm.value);
  } else {
    console.log('Form is not valid');
  }
}

Recent_Transactions=[
  {
    "logo_img":"/assets/images/dashboard/jio_logo.png",
    "partner_name":"JIO Prepaid",
    "Mobile_number":7275432835,
    "amount":"₹49",
    "status":"/assets/images/dashboard/transaction_succes.png"
  },
  {
    "logo_img":"/assets/images/dashboard/jio_logo.png",
    "partner_name":"JIO Prepaid",
    "Mobile_number":7275432835,
    "amount":"₹4449",
    "status":"/assets/images/dashboard/transaction_succes.png"
  },
  {
    "logo_img":"/assets/images/dashboard/jio_logo.png",
    "partner_name":"JIO Prepaid",
    "Mobile_number":7275432835,
    "amount":"₹444449",
    "status":"/assets/images/dashboard/transaction_failed.png"
  },
  {
    "logo_img":"/assets/images/dashboard/jio_logo.png",
    "partner_name":"JIO Prepaid",
    "Mobile_number":7275432835,
    "amount":"₹49",
    "status":"/assets/images/dashboard/transaction_failed.png"
  },
  {
    "logo_img":"/assets/images/dashboard/jio_logo.png",
    "partner_name":"JIO Prepaid",
    "Mobile_number":7275432835,
    "amount":"₹444449",
    "status":"/assets/images/dashboard/transaction_pending.png"
  },
  {
    "logo_img":"/assets/images/dashboard/jio_logo.png",
    "partner_name":"JIO Prepaid",
    "Mobile_number":7275432835,
    "amount":"₹49",
    "status":"/assets/images/dashboard/transaction_pending.png"
  },
  {
    "logo_img":"/assets/images/dashboard/jio_logo.png",
    "partner_name":"JIO Prepaid",
    "Mobile_number":7275432835,
    "amount":"₹49",
    "status":"/assets/images/dashboard/transaction_pending.png"
  },
  {
    "logo_img":"/assets/images/dashboard/jio_logo.png",
    "partner_name":"JIO Prepaid",
    "Mobile_number":7275432835,
    "amount":"₹49",
    "status":"/assets/images/dashboard/transaction_pending.png"
  }
]


//Animation for Error 
options: AnimationOptions = {
  path: '/assets/animation/Recharge_Animation_highest.json',
};
animationCreated(animationItem: AnimationItem): void {
  // console.log("hhsdjksasjkda",animationItem);
}
}