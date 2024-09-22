import { Component, Renderer2 } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ValidateUser, ValidateUserMpin, ValidateOTPAnotherDeviceLoginClass } from '../../../core/models/classes/BaseModel';
import { AuthenticationapiService } from '../../../core/services/authenticatioapi/authenticationapi.service';
import { GetlocationService } from '../../../core/services/location/getlocation.service';
import { MateriallistModule } from '../../../shared/materiallist/materiallist.module';
import { PchangelanguagePipe } from '../../../shared/pipes/changelanguage/pchangelanguage.pipe';
import { DialogBoxComponent } from '../../../shared/reusable-components/dialog-box/dialog-box.component';
import { FooterPageComponent } from '../footer-page/footer-page.component';
import { HeaderPageComponent } from '../header-page/header-page.component';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    CommonModule,
    MateriallistModule,
    PchangelanguagePipe,
    DialogBoxComponent,
    HeaderPageComponent,
    FooterPageComponent
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
    private toastr: ToastrService,
    private geolocationService: GetlocationService,
    private dialog : MatDialog
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
    sessionStorage.clear();
    localStorage.clear();
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
            this.UserNameValidate = response.Data[0].Name
            this.UserMobileNumber = response.Data[0].Mobileno
            this.step = 2;
          } 
          else if (response.Statuscode === 'ERR') {
            this.dialog.open(DialogBoxComponent, {
              data: { 
                status: 'Failed',
                message: response.Message,  
                additionalInfo: 'Sign-Up Failed Due to Suspicious Activity',
                animationPath:'/assets/animation/Animation_Error.json'
              },
              panelClass: 'custom-dialog-container',
              enterAnimationDuration: '400ms',
              exitAnimationDuration: '300ms',
            });
          }
          else if (response.Statuscode === 'UAB') {
            this.dialog.open(DialogBoxComponent, {
              data: { 
                status: 'Failed',
                message: response.Message,  
                additionalInfo: 'Please contact our support team to restore access.',
                animationPath:'/assets/animation/Animation_Error.json'
              },
              panelClass: 'custom-dialog-container',
              enterAnimationDuration: '400ms',
              exitAnimationDuration: '300ms',
            });
          }
        },
        (error) => {
          console.error('API Error Login:', error); // Handle error
          this.dialog.open(DialogBoxComponent, {
            data: { 
              status: 'Server Error',
              message:"Oops! Something went wrong",  
              additionalInfo: "We're experiencing some technical difficulties. Please try again later. If the problem persists, contact our support team for assistance.",
              animationPath:'/assets/animation/Animation_Error.json'
            },
            panelClass: 'custom-dialog-container',
            enterAnimationDuration: '400ms',
            exitAnimationDuration: '300ms',
          });
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
   
      console.log(this.passwordForm.value);
      const DataMpin: ValidateUserMpin = new ValidateUserMpin(this.passwordForm.get('Mpin')?.value, this.UserMobileNumber, "otpforweblogin");
      this.apiService.validateUserMPIN(DataMpin).subscribe(
        (response) => {
          // console.log('API Response:', response); // Handle the API response here
          if (response.Statuscode === "ODL") {
            this.UserMpin = DataMpin.Mpin
            this.passwordForm.reset()
            this.SendOtpcode();
           
          } else{
            this.dialog.open(DialogBoxComponent, {
              data: { 
                status: 'Failed',
                message:"Incorrect MPIN",  
                additionalInfo: "Please check your MPIN and try again.",
                animationPath:'/assets/animation/Animation_Error.json'
              },
              panelClass: 'custom-dialog-container',
              enterAnimationDuration: '400ms',
              exitAnimationDuration: '300ms',
            });
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
      this.dialog.open(DialogBoxComponent, {
        data: { 
          status: 'Success',
          message:response.Message,  
          additionalInfo: "Your OTP sent to your registered mobile number",
          animationPath:'/assets/animation/Animation_Success.json'
        },
        panelClass: 'custom-dialog-container',
        enterAnimationDuration: '400ms',
        exitAnimationDuration: '300ms',
      });
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
          this.dialog.open(DialogBoxComponent, {
            data: { 
              status: 'Success',
              message:response.Message,  
              additionalInfo: "You can now proceed with the next steps",
              animationPath:'/assets/animation/Animation_Success.json'
            },
            panelClass: 'custom-dialog-container',
            enterAnimationDuration: '400ms',
            exitAnimationDuration: '300ms',
          });
          this.MpinCallFinal();
          //this.otpForm.reset();
        }
        else if (response.Statuscode === "ERR"){
          this.dialog.open(DialogBoxComponent, {
            data: { 
              status: 'Failed',
              message:response.Message,  
              additionalInfo: "The OTP you entered is incorrect. Please check the OTP and try again.",
              animationPath:'/assets/animation/Animation_Error.json'
            },
            panelClass: 'custom-dialog-container',
            enterAnimationDuration: '400ms',
            exitAnimationDuration: '300ms',
          });
        }
      }, (error) => {
        this.toastr.error(error)
      })

    }
  }

  // Function to submit the MpinCallFinal
  MpinCallFinal(): void {
    console.log(this.passwordForm.value);
    const DataMpin: ValidateUserMpin = new ValidateUserMpin(this.UserMpin, this.UserMobileNumber);

    this.apiService.validateUserMPIN(DataMpin).subscribe(
      (response) => {
        // debugger
        console.log('API Response:', response); // Handle the API response here
        if (response.Statuscode === "TXN") {
          //Set UserLogintoken
          sessionStorage.setItem("UserLogintoken", response.Data[0].UserLogintoken);
          localStorage.setItem("UserLogintoken", response.Data[0].UserLogintoken);
          //Set Userid
          sessionStorage.setItem("Userid", response.Data[0].Id);
          localStorage.setItem("Userid", response.Data[0].Id);
          //Set UserLoginIDfortoken
          sessionStorage.setItem("UserLoginIDfortoken", response.Data[0].Id);
          localStorage.setItem("UserLoginIDfortoken", response.Data[0].Id);

          sessionStorage.setItem("Name", response.Data[0].Name);
          localStorage.setItem("Name", response.Data[0].Name);
        
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