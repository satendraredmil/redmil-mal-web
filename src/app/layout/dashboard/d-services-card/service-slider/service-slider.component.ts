import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-service-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './service-slider.component.html',
  styleUrl: './service-slider.component.scss'
})
export class ServiceSliderComponent {

   //Slider code login with Dynamic
   slides = [
    { image: '/assets/images/dashboard/service-slider.png', title: 'Slide 1' },
    { image: '/assets/images/dashboard/service-slider.png', title: 'Slide 2' },
    { image: '/assets/images/dashboard/service-slider.png', title: 'Slide 3' },
    { image: '/assets/images/dashboard/service-slider.png', title: 'Slide 4' },
    { image: '/assets/images/dashboard/service-slider.png', title: 'Slide 5' }
  ];

  currentIndex = 0;
  slideInterval: any;

  ngOnInit() {
    this.startAutoSlide();
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
}
