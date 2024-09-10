import { Component, Renderer2 } from '@angular/core';
import { HeaderPageComponent } from "../header-page/header-page.component";
import { FooterPageComponent } from "../footer-page/footer-page.component";
import { MateriallistModule } from '../../shared/materiallist/materiallist.module';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PchangelanguagePipe } from '../../shared/pipes/changelanguage/pchangelanguage.pipe';
import { Router } from '@angular/router';
import { AuthenticationapiService } from '../../core/services/authenticatioapi/authenticationapi.service';
import { ToastrService } from 'ngx-toastr';
import { ValidateOTPAnotherDeviceLoginClass, ValidateUser, ValidateUserMpin } from '../../core/models/classes/BaseModel';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    HeaderPageComponent,
    FooterPageComponent,
    MateriallistModule,
    CommonModule,
    PchangelanguagePipe
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {


  //Slider code login with Dynamic
  slides = [
    { image: '/assets/images/login/web-banner.png', title: 'Slide 1' },
    { image: '/assets/images/login/web-banner.png', title: 'Slide 2' },
    { image: '/assets/images/login/web-banner.png', title: 'Slide 3' },
    { image: '/assets/images/login/web-banner.png', title: 'Slide 4' },
    { image: '/assets/images/login/web-banner.png', title: 'Slide 5' }
  ];

  currentIndex = 0;
  slideInterval: any;
  Mobile: string = "";
  UserNameValidate: any;
  UserMobileNumber: string = "";
  UserMpin: string = ""

  //Form heading with validation and Services
  mobileForm!: FormGroup;
  passwordForm!: FormGroup;
  otpForm!: FormGroup;
  step: number = 1;


  constructor(
    private fb: FormBuilder,
    private _router: Router,
    private apiService: AuthenticationapiService,
    private toastr: ToastrService
  ) {
    this.mobileForm = this.fb.group({
      Mobile: [
        '',
        [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.minLength(10), Validators.maxLength(10)],
      ],
    });

    this.passwordForm = this.fb.group({
      Mpin: ['', Validators.pattern(/^[0-9]{4,6}$/)],
    });

    this.otpForm = this.fb.group({
      otp1: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      otp2: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      otp3: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      otp4: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    });
  }


  ngOnInit() {
    this.startAutoSlide();

  }

  ngOnDestroy() {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }

  startAutoSlide() {
    this.slideInterval = setInterval(() => {
      this.nextSlide();
    }, 3000);
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
  }

  goToSlide(index: number) {
    this.currentIndex = index;
  }



  //Form heading with validation 

  // Method to allow only numeric input in the mobile and password fields
  validateNumber(event: KeyboardEvent) {
    const keyCode = event.keyCode || event.which;
    const keyValue = String.fromCharCode(keyCode);

    // If the key pressed is not a number, prevent input
    if (!/^[0-9]+$/.test(keyValue) && keyCode !== 8) {
      event.preventDefault();
    }
  }

   // Submit password form on "Enter" keypress
  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter' && this.passwordForm.valid) {
      this.submitPassword();
      console.log("jjj");
    }
  }


  // Function to submit the OTP form
  onOtpInput(event: any, fieldIndex: any): void {

    const value = event.target.value;

    // Allow only digits
    if (!/^\d*$/.test(value)) {
      event.target.value = value.replace(/\D/g, ''); // Remove non-digit characters
    }

    // Move to the next input field
    if (value.length === 1 && event.target.value != "" && fieldIndex < 4) {
      const nextField = document.getElementById(`otp${fieldIndex + 1}`);
      if (nextField) {
        nextField.focus();
      }
    }

  }

  // Move to the previous input field if Backspace is pressed and the current field is empty
  moveToPrev(event: KeyboardEvent, currentFieldID: string, prevFieldID: string): void {
    const currentField = document.getElementById(currentFieldID) as HTMLInputElement;
    if (event.key === "Backspace" && currentField && currentField.value.length === 0) {
      const prevField = document.getElementById(prevFieldID) as HTMLInputElement;
      if (prevField) {
        prevField.focus();
      }
    }
  }



  // Function to submit the mobile number with API 
  submitMobile(): void {
    // Mark all fields as touched so validation errors show up if not valid
    this.mobileForm.markAllAsTouched();

    // If the form is valid, proceed to the next step (Password)
    if (this.mobileForm.valid) {
      debugger
      console.log(this.mobileForm.value);
      const Data: ValidateUser = new ValidateUser(this.mobileForm.get('Mobile')?.value)
      this.apiService.validateUser(Data).subscribe(
        (response) => {
          console.log('API Response:', response, Data); // Handle the API response here
          if (response.Statuscode === 'TXN') {
            this.toastr.success("Your Mobile is Valid")
            this.UserNameValidate = response.Data[0].Name
            this.UserMobileNumber = response.Data[0].Mobileno
            
            // console.log(this.UserNameValidate);
            this.step = 2;
          } if (response.Statuscode === 'ERR') {
            this.toastr.error(response.Message)
          }
        },
        (error) => {
          console.error('API Error Login:', error); // Handle error
        }
      );
    }
  }

  // Function to submit the MPIN API 
  submitPassword(): void {
    // Mark all fields as touched so validation errors show up if not valid
    this.passwordForm.markAllAsTouched();

    // If the form is valid, proceed to the next step (OTP)
    if (this.passwordForm.valid) {
      debugger
      console.log(this.passwordForm.value);
      const DataMpin: ValidateUserMpin = new ValidateUserMpin(this.passwordForm.get('Mpin')?.value, this.UserMobileNumber, "otpforweblogin");
      this.apiService.validateUserMPIN(DataMpin).subscribe(
        (response) => {
          // console.log('API Response:', response); // Handle the API response here
          if (response.Statuscode === "ODL") {
            this.toastr.success(response.Message)
            this.UserMpin = DataMpin.Mpin
            this.passwordForm.reset()
            this.SendOtpcode();
          } else {
            console.log("jkdjdsk");
          }
        },
        (error) => {
          console.error('API Error Login:', error); // Handle error
        }
      );

    }
  }

  // Function to submit the Send OTP API 
  SendOtpcode(): void {
    const DataMobile: ValidateUser = new ValidateUser(this.UserMobileNumber);
    this.apiService.UserSendOTP(DataMobile).subscribe((response) => {
      if (response.Statuscode === 'OSS')
        this.toastr.success(response.Message)
        this.step = 3;
    }, (error) => {
      console.log(`OTP API not working ${error}`);
    })
  }

// Function to submit the Submit OTP 
  submitOtp(): void {
    if (this.otpForm.valid) {
      // Combine OTP values and submit
      const otp = `${this.otpForm.value.otp1}${this.otpForm.value.otp2}${this.otpForm.value.otp3}${this.otpForm.value.otp4}`;
      console.log('OTP Submitted:', this.otpForm.value, otp);
      const DataOTPverify: ValidateOTPAnotherDeviceLoginClass = new ValidateOTPAnotherDeviceLoginClass(this.UserMobileNumber, otp);
      this.apiService.ValidateOTPAnotherDeviceLogin(DataOTPverify).subscribe((response) => {
        console.log('response:', response);
        if (response.Statuscode === "TXN") {
          this.MpinCallFinal();
          //this.otpForm.reset();
        }
      }, (error) => {
        this.toastr.error(error)
      })

    }
  }

  // Function to submit the MpinCallFinal
  MpinCallFinal(): void {

    debugger
    console.log(this.passwordForm.value);
    const DataMpin: ValidateUserMpin = new ValidateUserMpin(this.UserMpin, this.UserMobileNumber);

    this.apiService.validateUserMPIN(DataMpin).subscribe(
      (response) => {
        debugger
        console.log('API Response:', response); // Handle the API response here
        if (response.Statuscode === "TXN") {
          this.toastr.success(response.Message)
          this._router.navigate(['/dashboard'])
        } else {
          console.log("jkdjdsk");
        }
      },
      (error) => {
        console.error('API Error Login:', error); // Handle error
      }
    );

  }
}