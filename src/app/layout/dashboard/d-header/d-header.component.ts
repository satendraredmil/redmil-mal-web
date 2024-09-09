import { Component, signal } from '@angular/core';
import { SchangelanguageService } from '../../../core/services/changelanguage/schangelanguage.service';
import { PchangelanguagePipe } from '../../../shared/pipes/changelanguage/pchangelanguage.pipe';
import { MateriallistModule } from '../../../shared/materiallist/materiallist.module';

@Component({
  selector: 'app-d-header',
  standalone: true,
  imports: [PchangelanguagePipe, MateriallistModule],
  templateUrl: './d-header.component.html',
  styleUrl: './d-header.component.scss'
})
export class DHeaderComponent {
  readonly panelOpenState = signal(false);
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


