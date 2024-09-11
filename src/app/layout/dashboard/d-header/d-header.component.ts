import { Component, signal } from '@angular/core';
import { SchangelanguageService } from '../../../core/services/changelanguage/schangelanguage.service';
import { PchangelanguagePipe } from '../../../shared/pipes/changelanguage/pchangelanguage.pipe';
import { MateriallistModule } from '../../../shared/materiallist/materiallist.module';
import { DialogBoxComponent } from '../../../shared/reusable-components/dialog-box/dialog-box.component';
import { MatDialog } from '@angular/material/dialog';
import { AnimationItem } from 'lottie-web';
import { LottieComponent, AnimationOptions } from 'ngx-lottie';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-d-header',
  standalone: true,
  imports: [PchangelanguagePipe, MateriallistModule, LottieComponent, CommonModule],
  templateUrl: './d-header.component.html',
  styleUrl: './d-header.component.scss'
})
export class DHeaderComponent {
  panelOpenState:boolean = false;
  menuOpenState: boolean = false;

  isActive: boolean = false;
  isDarkMode: boolean = false;

  constructor(
    //public themeService: ThemeService,
    private translationService : SchangelanguageService,
    private dialog : MatDialog
  ) {
    this.isActive = this.translationService.isActiveLanguage();

    //darktheme active follow theme
    // this.themeService.isActiveTheme$.subscribe(isDark => {
    //   this.isDarkMode = isDark;
    // });
  }


  toggleLanguage() {
    this.isActive = !this.isActive; // Toggle the state
    this.translationService.toggleLanguage();
  }

 
//Animation for Error 
  options: AnimationOptions = {
    path: '/assets/animation/Animation_Pending.json',
  };
  animationCreated(animationItem: AnimationItem): void {
    console.log("hhsdjksasjkda",animationItem);
  }


  // toggleTheme() {
  //   this.themeService.toggleTheme();
  // }

}


