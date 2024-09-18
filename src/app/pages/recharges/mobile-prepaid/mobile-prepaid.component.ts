import { Component } from '@angular/core';
import { ServiceSliderComponent } from "../../../layout/dashboard/d-services-card/service-slider/service-slider.component";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MateriallistModule } from '../../../shared/materiallist/materiallist.module';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-mobile-prepaid',
  standalone: true,
  imports: [
    ServiceSliderComponent,
    MateriallistModule,
    CommonModule
  ],
  templateUrl: './mobile-prepaid.component.html',
  styleUrl: './mobile-prepaid.component.scss'
})
export class MobilePrepaidComponent {

  mobileForm!: FormGroup;
  operators = ['Airtel', 'Jio', 'Vodafone', 'BSNL']; // Aap apne operators yahan daal sakte hain
  operatorFilled = false;

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.mobileForm = this.fb.group({
      operator: ['', Validators.required], // Dropdown for operator
      mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]], // 10 digit validation
      circle: ['', Validators.required], // Dropdown for operator
      amount: ['', [Validators.required, Validators.min(1)]], // Amount input validation
    });
  }
// Function to call API when mobile number is entered completely
onMobileNumberChange() {
  const mobileNumber = this.mobileForm.get('mobileNumber')?.value;

  if (mobileNumber.length === 10) {
    this.callOperatorAPI(mobileNumber); // Call the API when 10 digits are entered
  }
}

// Simulating an API call to get the operator based on mobile number
callOperatorAPI(mobileNumber: string) {
  // Example API URL, change this to your actual API
  const apiUrl = `https://api.example.com/getOperator/${mobileNumber}`;

  this.http.get(apiUrl).subscribe(
    (response: any) => {
      this.operators = response.operators; // Assume API returns an array of operators
      this.operatorFilled = true;
      this.mobileForm.get('operator')?.setValue(this.operators[0]); // Auto-fill the first operator
    },
    (error) => {
      console.error('Error fetching operator data', error);
    }
  );
}

browsePlan() {
  alert('Browse Plan functionality goes here');
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
  }
]
}