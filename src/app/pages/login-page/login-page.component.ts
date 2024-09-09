import { Component, Renderer2 } from '@angular/core';
import { HeaderPageComponent } from "../header-page/header-page.component";
import { FooterPageComponent } from "../footer-page/footer-page.component";
import { MateriallistModule } from '../../shared/materiallist/materiallist.module';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PchangelanguagePipe } from '../../shared/pipes/changelanguage/pchangelanguage.pipe';
import { Router } from '@angular/router';
import { AuthenticationapiService } from '../../core/services/authenticatioapi/authenticationapi.service';
import { ValidateUser } from '../../core/models/interfaces/validateUser';
import { BaseModel_2 } from '../../core/models/classes/BaseModel';
import { ToastrService } from 'ngx-toastr';

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

  slides = [
    { image: '/assets/images/login/web-banner.png', title: 'Slide 1' },
    { image: '/assets/images/login/web-banner.png', title: 'Slide 2' },
    { image: '/assets/images/login/web-banner.png', title: 'Slide 3' },
    { image: '/assets/images/login/web-banner.png', title: 'Slide 4' },
    { image: '/assets/images/login/web-banner.png', title: 'Slide 5' }
  ];

  currentIndex = 0;
  slideInterval: any;

   //Form heading with validation and Services
   mobileForm!: FormGroup;
   passwordForm!: FormGroup;
   otpForm!: FormGroup;
   step: number = 1;
 

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private _router :Router,
    private renderer: Renderer2,
    private apiService: AuthenticationapiService,
    private toastr: ToastrService
  )   {
    this.mobileForm = this.fb.group({
      Mobile: [
        '',
        [Validators.required,Validators.pattern(/^[0-9]*$/),  Validators.minLength(10), Validators.maxLength(10)],
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



  //Form heading with validation and Services

    // Method to allow only numeric input in the mobile and password fields
    validateNumber(event: KeyboardEvent) {
      const keyCode = event.keyCode || event.which;
      const keyValue = String.fromCharCode(keyCode);
  
      // If the key pressed is not a number, prevent input
      if (!/^[0-9]+$/.test(keyValue) && keyCode !== 8) {
        event.preventDefault();
      }
    }

   

  // Function to submit the mobile number form
  submitMobile() {
    // Mark all fields as touched so validation errors show up if not valid
    this.mobileForm.markAllAsTouched();

    // If the form is valid, proceed to the next step (Password)
  
    if (this.mobileForm.valid) {
      debugger
      console.log(this.mobileForm.value);
      const mobileNumber = this.mobileForm.get('Mobile')?.value;

      // Create an instance of ValidateUser
      const userData = new BaseModel_2(
        mobileNumber,
        this.apiService.Userid,
        undefined, // Id
        undefined, // Wallet
        undefined, // Token
        undefined, // UserLogintoken
        undefined, // UserLoginIDfortoken
        undefined // Redmilweb
      );
      
      this.apiService.validateUser(this.mobileForm.value).subscribe(
        (response) => {
          console.log('API Response:', response); // Handle the API response here
          if(response.Statuscode==='TXN'){
            this.toastr.success("User validation siu")
            this.step = 2;
          }
        },
        (error) => {
          console.error('API Error Login:', error); // Handle error
        }
      );
     
    }


  }

  // Function to submit the password form
  submitPassword() {
    // Mark all fields as touched so validation errors show up if not valid
    this.passwordForm.markAllAsTouched();

    // If the form is valid, proceed to the next step (OTP)
    if (this.passwordForm.valid) {
      debugger
      console.log(this.passwordForm.value);
      const mobileNumber = this.passwordForm.get('Mpin')?.value;

      this.apiService.validateUserMPIN(this.passwordForm.value).subscribe(
        (response) => {
          console.log('API Response:', response); // Handle the API response here
          if(response.Statuscode==="ERR"){
            this.toastr.error(response.Message)
            this.passwordForm.reset()
          }else{
            this.step = 3;
          }
          
        },
        (error) => {
          console.error('API Error Login:', error); // Handle error
        }
      );
      
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
onOtpInput(event: any, fieldIndex:any): void {
  
    const value = event.target.value;

     // Allow only digits
     if (!/^\d*$/.test(value)) {
      event.target.value = value.replace(/\D/g, ''); // Remove non-digit characters
    }
    
    // Move to the next input field
    if (value.length === 1 && event.target.value!="" && fieldIndex < 4) {
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

  submitOtp(): void {
    if (this.otpForm.valid) {
      // Combine OTP values and submit
      const otp = `${this.otpForm.value.otp1}${this.otpForm.value.otp2}${this.otpForm.value.otp3}${this.otpForm.value.otp4}`;
      console.log('OTP Submitted:', this.otpForm.value, otp);
      this.otpForm.reset();
      this._router.navigate(['/dashboard'])
      // Add your OTP submission logic here
    }
  } 
}