import { Component, inject } from '@angular/core';
import { SchangelanguageService } from '../../core/services/changelanguage/schangelanguage.service';
import { PchangelanguagePipe } from '../../shared/pipes/changelanguage/pchangelanguage.pipe';
import { ThemeService } from '../../core/services/theme/theme.service';

@Component({
  selector: 'app-header-page',
  standalone: true,
  imports: [PchangelanguagePipe],
  templateUrl: './header-page.component.html',
  styleUrl: './header-page.component.scss'
})
export class HeaderPageComponent {

  isActive: boolean = false;
  isDarkMode: boolean = false;

  constructor(
    //public themeService: ThemeService,
    private translationService : SchangelanguageService
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

  // toggleTheme() {
  //   this.themeService.toggleTheme();
  // }

}

