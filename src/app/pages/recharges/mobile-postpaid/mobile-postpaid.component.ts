import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AnimationItem } from 'lottie-web';
import { LottieComponent, AnimationOptions } from 'ngx-lottie';
import { Recharges } from '../../../core/models/classes/recharges/MobileRecharge';
import { MobilePrepaidService } from '../../../core/services/recharges/mobile-prepaid/mobile-prepaid.service';
import { ServiceSliderComponent } from '../../../layout/dashboard/d-services-card/service-slider/service-slider.component';
import { MateriallistModule } from '../../../shared/materiallist/materiallist.module';
import { FooterPageComponent } from '../../login/footer-page/footer-page.component';
import { FastagRechargeComponent } from '../fastag-recharge/fastag-recharge.component';
import { PrepaidBrowsePlanComponent } from '../mobile-prepaid/prepaid-browse-plan/prepaid-browse-plan.component';
import { RechargepupComponent } from '../../../shared/reusable-components/rechargepup/rechargepup.component';
import { WalletsPupComponent } from '../../../shared/reusable-components/wallets-pup/wallets-pup.component';
import { DialogBoxComponent } from '../../../shared/reusable-components/dialog-box/dialog-box.component';

@Component({
  selector: 'app-mobile-postpaid',
  standalone: true,
  imports: [
    ServiceSliderComponent,
    MateriallistModule,
    CommonModule,
    LottieComponent,
    FastagRechargeComponent,
    FooterPageComponent,
  ],
  templateUrl: './mobile-postpaid.component.html',
  styleUrl: './mobile-postpaid.component.scss'
})
export class MobilePostpaidComponent {

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
  BrowsePlanData:any ;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private rechargeapi: MobilePrepaidService
  ) {}

  ngOnInit(): void {
    this.mobileForm = this.fb.group({
      operator: ['', Validators.required], // Dropdown for operator
      mobileNumber: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{10}$')],
      ], // 10 digit validation
  
      amount: ['', [Validators.required, Validators.min(1)]], // Amount input validation
    });

    this.BindOperaterDataDropDown();
  }

  BindOperaterDataDropDown() {
    const MobileRecharge: Recharges = new Recharges();
    MobileRecharge.ServiceId  = "22";
    this.rechargeapi.GetOperaterList(MobileRecharge).subscribe((res) => {
      // console.log('GetOperaterList', res.Data);
      this.operators = res.Data;
    });
    this.SelectedOperatorName = '';
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

  onSubmitwithRecharge() {
    if (this.mobileForm.valid) {
      console.log('Form Submjsgdjsitted', this.mobileForm.value);
      // this.RechargeValueData = this.mobileForm.value;
      const dialogRefs = this.dialog.open(WalletsPupComponent, {
        data: { amount: this.mobileForm.value.amount },
      });
      dialogRefs.afterClosed().subscribe((result) => {
        if (result) {
          debugger
          console.log(`Dialog result: ${result}`);
          const makeRechargedata: Recharges = new Recharges()
          makeRechargedata.Mobileno=this.mobileForm.value.mobileNumber;
          makeRechargedata.ServiceId="22";
          makeRechargedata.OpId=this.mobileForm.value.operator;
          makeRechargedata.Amount=this.mobileForm.value.amount;
          if (result === 'cash-wallet') {
            makeRechargedata.Wallet= 'True';
          }   
          this.rechargeapi.Recharge(makeRechargedata).subscribe((res)=>{
            console.log('Recharge', res);
            let animationPath1='/assets/animation/Animation_Success.json';
                if(res.Data[0].Status === 'Pending')
                {
                  animationPath1='/assets/animation/Animation_Pending.json';
                }
                else if(res.Statuscode === 'ERR' || res.Data[0].Status === 'Failure')
                {
                  animationPath1='/assets/animation/Animation_Error.json';
                }
            if(Array.isArray(res.Data))
              {
                
                this.dialog.open(RechargepupComponent, {
                  data: {
                    ServiceId:22,
                    Statuscode: res.Statuscode,
                    Id: res.Data[0].Id,
                    status: res.Data[0].Status,
                    MobileNo: res.Data[0].Mobileno,
                    amount: res.Data[0].Amount,
                    TxnID: res.Data[0].TRefId,
                    Date: res.Data[0].Reqdate,
                    message:res.Data[0].Response,
                    animationPath:animationPath1,
                    //additionalInfo: 'Thank you for using our service.',
                  }
                });
                this.mobileForm.reset();
              }
              else{
                this.dialog.open(DialogBoxComponent, {
                  data: { 
                    message: res.Message,  
                    animationPath:animationPath1
                  },
                  panelClass: 'custom-dialog-container',
                  enterAnimationDuration: '400ms',
                  exitAnimationDuration: '300ms',
                });
              }
          })
        }
      });
    } else {
      console.log('Form is not valid');
    }
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

