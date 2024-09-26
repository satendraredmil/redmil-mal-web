import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { ToastrService } from 'ngx-toastr';
import { Recharges } from '../../../core/models/classes/recharges/MobileRecharge';
import { DashboardService } from '../../../core/services/dashboard/dashboard.service';
import { MobilePrepaidService } from '../../../core/services/recharges/mobile-prepaid/mobile-prepaid.service';
import { RechargepupComponent } from '../../../shared/reusable-components/rechargepup/rechargepup.component';
import { WalletsPupComponent } from '../../../shared/reusable-components/wallets-pup/wallets-pup.component';
import { PrepaidBrowsePlanComponent } from '../mobile-prepaid/prepaid-browse-plan/prepaid-browse-plan.component';
import { MateriallistModule } from '../../../shared/materiallist/materiallist.module';
import { DthBrowseplanComponent } from './dth-browseplan/dth-browseplan.component';
import { DialogBoxComponent } from '../../../shared/reusable-components/dialog-box/dialog-box.component';
import { log } from 'console';

@Component({
  selector: 'app-dth-recharge',
  standalone: true,
  imports: [MateriallistModule, CommonModule],
  templateUrl: './dth-recharge.component.html',
  styleUrl: './dth-recharge.component.scss'
})
export class DthRechargeComponent {


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
  RecentTransactions: any[]=[];
  Recent_TransactionsDataPath: string = 'https://api.redmilbusinessmall.com/'; // Path for brand images

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
      amount: ['', [Validators.required, Validators.min(0)]], // Amount input validation
    });

    this.BindOperaterDataDropDown();
  }

  BindOperaterDataDropDown() {
    const MobileRecharge: Recharges = new Recharges();
    MobileRecharge.ServiceId  = "23";
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


 browsePlan() {
  if (this.mobileForm.get('operator')?.valid) {
    
//alert('Browse Plan functionality goes here');
const MyPayStoreBrowsPlansData: Recharges = new Recharges();
MyPayStoreBrowsPlansData.Mobileno=this.mobileForm.get('mobileNumber')?.value,
MyPayStoreBrowsPlansData.OpId=this.mobileForm.get('operator')?.value,

this.OpId = this.mobileForm.get('operator')?.value
console.log(MyPayStoreBrowsPlansData);

this.rechargeapi
  .MyPayStoreBrowsPlans(MyPayStoreBrowsPlansData)
  .subscribe((res) => {
    console.log('Plan', res);
    if (res.Statuscode === 'TXN') {
      this.BrowsePlanData = res;
      const dialogRef = this.dialog.open(DthBrowseplanComponent, {
        data: { BrowsePlan: this.BrowsePlanData },
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          console.log(`Dialog result: ${result.desc}`);
          console.log(`Dialog result: ${result.month1}`);
          if(result.month1!=null)
          {
            this.mobileForm.patchValue({ amount: result.month1 });
          }
          else if(result.month3!=null)
            {
              this.mobileForm.patchValue({ amount: result.month3 });
            }
            else if(result.month6!=null)
              {
                this.mobileForm.patchValue({ amount: result.month6 });
              }
              else if(result.year1!=null)
                {
                  this.mobileForm.patchValue({ amount: result.year1 });
                }

          
        }
      });
    } else if(res.Statuscode==='ERR'){
      this.toster.error(res.Message, 'Please enter mobile number')
    }
  });
    }
    
    else if (!this.mobileForm.get('operator')?.value)
      {
        this.toster.error('Please select operator !') 
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
          makeRechargedata.ServiceId="23";
          makeRechargedata.OpId=this.mobileForm.value.operator;
          makeRechargedata.Amount=this.mobileForm.value.amount;
          if (result === 'cash-wallet') {
            makeRechargedata.Wallet= 'True';
          }   
          this.rechargeapi.Recharge(makeRechargedata).subscribe((res)=>{
            console.log(Array.isArray(res.Data));
            console.log(res.Data);
            debugger;
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
                  ServiceId:23,
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
            console.log('Rechargesss', res);
           
            
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




  //Animation for Error
  options: AnimationOptions = {
    path: '/assets/animation/Recharge_Animation_highest.json',
  };

  animationCreated(animationItem: AnimationItem): void {
    // console.log("hhsdjksasjkda",animationItem);
  }
}

