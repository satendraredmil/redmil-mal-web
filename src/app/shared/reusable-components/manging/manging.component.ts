import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FooterPageComponent } from '../../../pages/footer-page/footer-page.component';
import { HeaderPageComponent } from '../../../pages/header-page/header-page.component';
import { MateriallistModule } from '../../materiallist/materiallist.module';
import { PchangelanguagePipe } from '../../pipes/changelanguage/pchangelanguage.pipe';

@Component({
  selector: 'app-manging',
  standalone: true,
  imports: [
    HeaderPageComponent, 
    FooterPageComponent,
    MateriallistModule,
    CommonModule,
    PchangelanguagePipe
  ],
  templateUrl: './manging.component.html',
  styleUrl: './manging.component.scss'
})
export class MangingComponent {

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
 

  constructor(private http: HttpClient,
    private fb: FormBuilder
  ) 
  {
    this.mobileForm = this.fb.group({
      mobile: [
        '',
        [Validators.required,Validators.pattern(/^[0-9]*$/),  Validators.minLength(10), Validators.maxLength(10)],
      ],
    });

    this.passwordForm = this.fb.group({
      password: ['', Validators.pattern(/^[0-9]{4,6}$/)],
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
      console.log(this.mobileForm.value);
      
      this.step = 2;
    }
  }

  // Function to submit the password form
  submitPassword() {
    // Mark all fields as touched so validation errors show up if not valid
    this.passwordForm.markAllAsTouched();

    // If the form is valid, proceed to the next step (OTP)
    if (this.passwordForm.valid) {
      console.log(this.passwordForm.value);
      
      this.step = 3;
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
onOtpInput(event: any, fieldIndex: number): void {
    const value = event.target.value;

     // Allow only digits
     if (!/^\d*$/.test(value)) {
      event.target.value = value.replace(/\D/g, ''); // Remove non-digit characters
    }
    
    // Move to the next input field
    if (value.length === 1 && fieldIndex < 4) {
      const nextField = document.getElementById(`otp${fieldIndex + 1}`);
      if (nextField) {
        nextField.focus();
      }
    }

    // Move to the previous input field if the current field is empty
    if (value.length === 0 && fieldIndex > 1) {
      const prevField = document.getElementById(`otp${fieldIndex - 1}`);
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
      // Add your OTP submission logic here
    }
  }

  // toggleLanguage() {
  //   this.isActive = !this.isActive;

  //   const selectedLanguage = this.isActive ? 'English' : 'Hindi';

  //   // API call based on selected language
  //   this.http.post('https://your-api-endpoint.com/language', { language: selectedLanguage })
  //     .subscribe(response => {
  //       console.log('Language updated successfully', response);
  //     }, error => {
  //       console.error('Error updating language', error);
  //     });
  // }


}
