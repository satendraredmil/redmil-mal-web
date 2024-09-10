import { Component, signal } from '@angular/core';
import { SchangelanguageService } from '../../../core/services/changelanguage/schangelanguage.service';
import { PchangelanguagePipe } from '../../../shared/pipes/changelanguage/pchangelanguage.pipe';
import { MateriallistModule } from '../../../shared/materiallist/materiallist.module';
import { DialogBoxComponent } from '../../../shared/reusable-components/dialog-box/dialog-box.component';
import { MatDialog } from '@angular/material/dialog';

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

  OpenDialogBox(){
    this.dialog.open(DialogBoxComponent, {
      data: { 
        title: 'Success', 
        status: 'Success',
        message: 'This is a success message!', 
        imageUrl: 'path/to/image.jpg',
        additionalInfo: 'This is additional dynamic content',
        list: ['Item 1', 'Item 2', 'Item 3'] // You can also send lists or arrays
      },
      panelClass: 'custom-dialog-container',
      enterAnimationDuration: '400ms',
      exitAnimationDuration: '300ms',
    });
  }

  
 
  


  // toggleTheme() {
  //   this.themeService.toggleTheme();
  // }

}


