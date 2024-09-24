import { ToastrService } from 'ngx-toastr';
import { Component, ElementRef, Input } from '@angular/core';
import { ServiceSliderComponent } from '../../../layout/dashboard/d-services-card/service-slider/service-slider.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MateriallistModule } from '../../../shared/materiallist/materiallist.module';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PrepaidBrowsePlanComponent } from './prepaid-browse-plan/prepaid-browse-plan.component';
import { AnimationItem } from 'lottie-web';
import { LottieComponent, AnimationOptions } from 'ngx-lottie';
import { FastagRechargeComponent } from '../fastag-recharge/fastag-recharge.component';
import { FooterPageComponent } from '../../login/footer-page/footer-page.component';
import { MobilePrepaidService } from '../../../core/services/recharges/mobile-prepaid/mobile-prepaid.service';
import { Recharges } from '../../../core/models/classes/recharges/MobileRecharge';
import { WalletsPupComponent } from '../../../shared/reusable-components/wallets-pup/wallets-pup.component';
import { DashboardService } from '../../../core/services/dashboard/dashboard.service';
import { RechargepupComponent } from '../../../shared/reusable-components/rechargepup/rechargepup.component';

@Component({
  selector: 'app-mobile-prepaid',
  standalone: true,
  imports: [
    ServiceSliderComponent,
    MateriallistModule,
    CommonModule,
    LottieComponent,
    FastagRechargeComponent,
    FooterPageComponent,
  ],
  templateUrl: './mobile-prepaid.component.html',
  styleUrl: './mobile-prepaid.component.scss',
})
export class MobilePrepaidComponent {
  @Input() formType: string | null = null;

  mobileForm!: FormGroup;
  operators: any[] = []; // Aap apne operators yahan daal sakte hain
  circles: any[] = []; // Aap apne operators yahan daal sakte hain
  operatorFilled = false;
  pricePlan: string = '';
  Circle: string = '';
  OpId: string = '';
  OperatorName: string = '';
  SelectedOperatorName: string = '';
  circleData: any[] = [];
  BrowsePlanData: any;
  RechargeValueData: any[] = [];
  DialogRef: any;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private rechargeapi: MobilePrepaidService,
    private dashboardapi:DashboardService,
    private toster:ToastrService
  ) {}

  ngOnInit(): void {
    this.mobileForm = this.fb.group({
      operator: ['', Validators.required], // Dropdown for operator
      mobileNumber: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{10}$')],
      ], // 10 digit validation
      circle: ['', Validators.required], // Dropdown for operator
      amount: ['', [Validators.required, Validators.min(1)]], // Amount input validation
    });

    this.BindOperaterDataDropDown();
    this.BindcircleDataDropDown();
    this.Maketransactions_recentTransaction();
  }

  BindOperaterDataDropDown() {
    const MobileRecharge: Recharges = new Recharges();
    this.rechargeapi.GetOperaterList(MobileRecharge).subscribe((res) => {
      // console.log('GetOperaterList', res.Data);
      this.operators = res.Data;
    });
    this.SelectedOperatorName = '';
  }

  BindcircleDataDropDown() {
    const GetCircleListData: Recharges = new Recharges();
    this.rechargeapi.GetCircleList(GetCircleListData).subscribe((res) => {
      //console.log('GetCircleList', res);
      if (res.Data) {
        this.circles = res.Data;
      }
    });
    this.Circle = '';
  }

  GetOperaterData() {
    if (this.OperatorName.includes('jio')) {
      this.OperatorName = 'jio';
    } else if (this.OperatorName.includes('airtel')) {
      this.OperatorName = 'airtel';
    }
    if (this.OperatorName.includes('bsnl')) {
      this.OperatorName = 'bsnl';
    } else if (this.OperatorName.includes('idea')) {
      this.OperatorName = 'idea';
    }
    if (this.OperatorName.includes('mtnl')) {
      this.OperatorName = 'mtnl';
    } else if (
      this.OperatorName.includes('vodafone') ||
      this.OperatorName.includes('vi')
    ) {
      this.OperatorName = 'vodafone';
    }
    const lowerCaseOperators = this.operators.map((operator) => ({
      ...operator,
      Operatorname: operator.Operatorname.toLowerCase(), // Convert to lowercase
    }));
    this.OpId =
      lowerCaseOperators.find((item) =>
        item.Operatorname.includes(this.OperatorName)
      )?.Id || '';
    this.SelectedOperatorName = this.OpId;
  }

  GetCircleData() {
    const newCircle = {
      Id: 31,
      State: this.Circle,
      StateCode: 'NX',
    };
    this.circles.push(newCircle);
    //console.log('GetCircleListFinal', this.circles);
  }

  clearDropdown() {
    const index = this.circles.findIndex((circle) => circle.Id === 31);
    if (index !== -1) {
      this.circles.splice(index, 1);
    }
    this.SelectedOperatorName = '';
    this.Circle = '';
    this.mobileForm.patchValue({ amount: '' });
  }

  // Function to call API when mobile number is entered completely
  onMobileNumberChange() {
    const mobileNumber = this.mobileForm.get('mobileNumber')?.value;
    const MobileRecharge: Recharges = new Recharges(mobileNumber);
    this.clearDropdown();
    if (mobileNumber.length === 10) {
      // Call the API when 10 digits are entered
      this.rechargeapi.MyPayStoreGetCircle(MobileRecharge).subscribe((res) => {
        //console.log(res);
        // Circle data ko nikal kar set kar rahe hain
        if (res.Data && res.Data.circle) {
          this.Circle = res.Data.circle; // Yaha 'circle' ko set kar rahe hain jo ngModel ke sath bind hai
          this.OperatorName = res.Data.operator.toLowerCase();
          // console.log(this.Circle);
          // console.log(this.OperatorName);

          this.GetOperaterData();
          this.GetCircleData();
        }
      });
    }
  }

 browsePlan() {
  if (this.mobileForm.get('mobileNumber')?.value && this.mobileForm.get('operator')?.valid &&  this.mobileForm.get('circle')?.valid) {

//alert('Browse Plan functionality goes here');
const UserLogintoken = sessionStorage.getItem('UserLogintoken')?.toString();
const UserLoginIDfortoken = sessionStorage.getItem('UserLoginIDfortoken')?.toString();
const MyPayStoreBrowsPlansData: Recharges = new Recharges(
  this.mobileForm.get('mobileNumber')?.value,
  this.Circle,
  UserLogintoken,
  UserLoginIDfortoken,
  this.OpId
);
this.rechargeapi
  .MyPayStoreBrowsPlans(MyPayStoreBrowsPlansData)
  .subscribe((res) => {
    console.log('Plan', res);
    if (res.Statuscode === 'TXN') {
      this.BrowsePlanData = res;
      const dialogRef = this.dialog.open(PrepaidBrowsePlanComponent, {
        data: { BrowsePlan: this.BrowsePlanData },
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          console.log(`Dialog result: ${result.Rs}`);
          console.log(`Dialog result: ${result.Validity}`);
          this.mobileForm.patchValue({ amount: result.Rs });
        }
      });
    } else if(res.Statuscode==='ERR'){
      this.toster.error(res.Message, 'Please enter mobile number')
    }
  });
    }
    else if (!this.mobileForm.get('mobileNumber')?.value)
    {
      this.toster.error('Please enter valid mobile number !') 
    }
    else if (!this.mobileForm.get('operator')?.value)
      {
        this.toster.error('Please select operator !') 
      }
      else if (!this.mobileForm.get('circle')?.value)
        {
          this.toster.error('Please select circle !') 
        }
    else{
      this.toster.error('Please fill all details')
    }
    
  }

  onSubmitwithRecharge() {
    if (this.mobileForm.valid) {
      console.log('Form Submjsgdjsitted', this.mobileForm.value);
      this.RechargeValueData = this.mobileForm.value;
      const dialogRefs = this.dialog.open(WalletsPupComponent, {
        data: { amount: this.mobileForm.value.amount },
      });
      dialogRefs.afterClosed().subscribe((result) => {
        if (result) {
          debugger
          console.log(`Dialog result: ${result}`);
          const makeRechargedata: Recharges = new Recharges()
          makeRechargedata.Mobileno=this.mobileForm.value.mobileNumber;
          makeRechargedata.ServiceId="21";
          makeRechargedata.OpId=this.mobileForm.value.operator;
          makeRechargedata.Amount=this.mobileForm.value.amount;
          if (result === 'cash-wallet') {
            makeRechargedata.Wallet= 'True';
          }   
          this.rechargeapi.Recharge(makeRechargedata).subscribe((res)=>{
            console.log('Recharge', res);
            if(res.StatusCode==='TXN'){
              this.dialog.open(RechargepupComponent, {
                data: {
                  status: res.Statuscode,
                  MobileNo: res.Data[0].Mobileno,
                  amount: res.Data[0].Amount,
                  TxnID: res.Data[0].TRefId,
                  Date: res.Data[0].Reqdate,
                  message:res.Message,
                  animationPath:'/assets/animation/Animation_Success.json',
                  additionalInfo: 'Thank you for using our service.',
                }
              });
            } 
          })
        }
      });
    } else {
      console.log('Form is not valid');
    }
  }

  openPaymentDialog(amount: number): void {
    this.dialog.open(WalletsPupComponent, {
      data: { amount: amount },
    });
  }

  Maketransactions_recentTransaction(){
    debugger
    this.rechargeapi.transactions_recentTransaction().subscribe((res)=>{
      console.log('Recent Transaction', res);
    })
  }

  Recent_Transactions = [
    {
      logo_img: '/assets/images/dashboard/jio_logo.png',
      partner_name: 'JIO Prepaid',
      Mobile_number: 7275432835,
      amount: '₹49',
      status: '/assets/images/dashboard/transaction_succes.png',
    },
    {
      logo_img: '/assets/images/dashboard/jio_logo.png',
      partner_name: 'JIO Prepaid',
      Mobile_number: 7275432835,
      amount: '₹4449',
      status: '/assets/images/dashboard/transaction_succes.png',
    },
    {
      logo_img: '/assets/images/dashboard/jio_logo.png',
      partner_name: 'JIO Prepaid',
      Mobile_number: 7275432835,
      amount: '₹444449',
      status: '/assets/images/dashboard/transaction_failed.png',
    },
    {
      logo_img: '/assets/images/dashboard/jio_logo.png',
      partner_name: 'JIO Prepaid',
      Mobile_number: 7275432835,
      amount: '₹49',
      status: '/assets/images/dashboard/transaction_failed.png',
    },
    {
      logo_img: '/assets/images/dashboard/jio_logo.png',
      partner_name: 'JIO Prepaid',
      Mobile_number: 7275432835,
      amount: '₹444449',
      status: '/assets/images/dashboard/transaction_pending.png',
    },
    {
      logo_img: '/assets/images/dashboard/jio_logo.png',
      partner_name: 'JIO Prepaid',
      Mobile_number: 7275432835,
      amount: '₹49',
      status: '/assets/images/dashboard/transaction_pending.png',
    },
    {
      logo_img: '/assets/images/dashboard/jio_logo.png',
      partner_name: 'JIO Prepaid',
      Mobile_number: 7275432835,
      amount: '₹49',
      status: '/assets/images/dashboard/transaction_pending.png',
    },
    {
      logo_img: '/assets/images/dashboard/jio_logo.png',
      partner_name: 'JIO Prepaid',
      Mobile_number: 7275432835,
      amount: '₹49',
      status: '/assets/images/dashboard/transaction_pending.png',
    },
  ];

  //Animation for Error
  options: AnimationOptions = {
    path: '/assets/animation/Recharge_Animation_highest.json',
  };

  animationCreated(animationItem: AnimationItem): void {
    // console.log("hhsdjksasjkda",animationItem);
  }
}
