import { Component, ElementRef, HostListener, signal } from '@angular/core';
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
  isDropdownOpen = false;
  isDropdownOpenMega = false;  // Variable to track dropdown state
  activeLink: string | null = null; // Track the active link
  isMenuOpen: boolean = false;



  constructor(
    //public themeService: ThemeService,
    private translationService : SchangelanguageService,
    private dialog : MatDialog,
    private eRef: ElementRef
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

  
// Method to toggle the dropdown visibility
toggleDropdown() {
  this.isDropdownOpen = !this.isDropdownOpen;
  this.isDropdownOpenMega = false;
}

toggleDropdownMega(){
  this.isDropdownOpen = false
  this.isDropdownOpenMega = !this.isDropdownOpenMega

   }
   

setActiveLink(link: string | null) {
  this.activeLink = link;
  this.isDropdownOpen = false; // Optionally close the dropdown on link click
}

@HostListener('document:click', ['$event'])
handleOutsideClick(event: Event) {
  // If the click is outside the dropdown menu, close it
  if (!this.eRef.nativeElement.contains(event.target)) {
    this.isDropdownOpen = false;
    this.isDropdownOpenMega = false;
    this.closeMenu();
  }
}

 // Function to open the menu
 openMenu() {
  this.isMenuOpen = true;
  const navLinks = this.eRef.nativeElement.querySelector('.nav-links');
  if (navLinks) {
    navLinks.style.left = '0'; // Move the menu to the right (open)
  }
}

// Function to close the menu
closeMenu() {
  this.isMenuOpen = false;
  const navLinks = this.eRef.nativeElement.querySelector('.nav-links');
  if (navLinks) {
    navLinks.style.left = '-100%'; // Move the menu to the left (close)
  }
}






mainMenu = [
  {
    mainLink: "Learn Tutorials",
    showMega: "showMega",
    subMenu: [
      {
        heading: "❇️ Web-Development",
        megaLink: [
          {
            mega_icons: "assets/icons/web/html.svg",
            mega_link: "/quiztest/html_quiz",
            mega_name: "Learn HTML"
          },
          {
            mega_icons: "assets/icons/web/css.svg",
            mega_link: "/quiztest/html_quiz",
            mega_name: "Learn CSS"
          },
          // {
          //   mega_icons: "assets/icons/jquery.svg",
          //   mega_link: "/quiztest/html_quiz",
          //   mega_name: "Learn Bootstrap"
          // },
          {
            mega_icons: "assets/icons/web/js.svg",
            mega_link: "/quiztest/html_quiz",
            mega_name: "Learn JavaScript"
          },
          {
            mega_icons: "assets/icons/web/jquery.svg",
            mega_link: "/quiztest/html_quiz",
            mega_name: "Learn jQuery"
          },
          {
            mega_icons: "assets/icons/web/angular.svg",
            mega_link: "/quiztest/html_quiz",
            mega_name: "Learn Angular"
          },
          {
            mega_icons: "assets/icons/web/react.svg",
            mega_link: "/quiztest/html_quiz",
            mega_name: "Learn React"
          },
          {
            mega_icons: "assets/icons/right.svg",
            mega_link: "/categories/web_development_tutorials",
            mega_name: "Learn More"
          },

        ]
      },

      {
        heading: "❇️ Programming",
        megaLink: [
          {
            mega_icons: "assets/icons/program/python.svg",
            mega_link: "/quiztest/html_quiz",
            mega_name: "Learn Python"
          },
          {
            mega_icons: "assets/icons/program/java.svg",
            mega_link: "/quiztest/html_quiz",
            mega_name: "Learn Java"
          },
          {
            mega_icons: "assets/icons/program/c.svg",
            mega_link: "/quiztest/html_quiz",
            mega_name: "Learn C"
          },
          {
            mega_icons: "assets/icons/program/cplusplus.svg",
            mega_link: "/quiztest/html_quiz",
            mega_name: "Learn C++"
          },
          {
            mega_icons: "assets/icons/program/c-sharp.svg",
            mega_link: "/quiztest/html_quiz",
            mega_name: "Learn C#"
          },
          {
            mega_icons: "assets/icons/program/kotlin.svg",
            mega_link: "/quiztest/html_quiz",
            mega_name: "Learn Kotlin"
          },
          {
            mega_icons: "assets/icons/right.svg",
            mega_link: "/categories/computer_programming_tutorials",
            mega_name: "Learn More"
          },

        ]
      },

      {
        heading: "❇️ Databases",
        megaLink: [
          {
            mega_icons: "assets/icons/databases/mysql.svg",
            mega_link: "/quiztest/html_quiz",
            mega_name: "Learn MySQL"
          },
          {
            mega_icons: "assets/icons/databases/sql.svg",
            mega_link: "/quiztest/html_quiz",
            mega_name: "Learn SQL"
          },
          {
            mega_icons: "assets/icons/databases/mongodb.svg",
            mega_link: "/quiztest/html_quiz",
            mega_name: "Learn MongoDB"
          },
          {
            mega_icons: "assets/icons/databases/php.svg",
            mega_link: "/quiztest/html_quiz",
            mega_name: "Learn PHP"
          },
          {
            mega_icons: "assets/icons/databases/dotnet.svg",
            mega_link: "/quiztest/html_quiz",
            mega_name: "Google ASP"
          },
          {
            mega_icons: "assets/icons/databases/nodejs.svg",
            mega_link: "/quiztest/html_quiz",
            mega_name: "Learn Node js"
          },
          {
            mega_icons: "assets/icons/right.svg",
            mega_link: "/categories/database_tutorials",
            mega_name: "Learn More"
          }
        ]
      },

      {
        heading: "❇️ Data-Analytics",
        megaLink: [
          {
            mega_icons: "assets/icons/analytics/ai.svg",
            mega_link: "/quiztest/html_quiz",
            mega_name: "Learn AI"
          },
          {
            mega_icons: "assets/icons/analytics/ml.svg",
            mega_link: "/quiztest/html_quiz",
            mega_name: "Learn ML"
          },
          {
            mega_icons: "assets/icons/analytics/data.svg",
            mega_link: "/quiztest/html_quiz",
            mega_name: "Learn DS"
          },
          {
            mega_icons: "assets/icons/analytics/numpy.svg",
            mega_link: "/quiztest/html_quiz",
            mega_name: "Learn Numpy"
          },
          {
            mega_icons: "assets/icons/analytics/panda.svg",
            mega_link: "/quiztest/html_quiz",
            mega_name: "Learn Pandas"
          },
          {
            mega_icons: "assets/icons/analytics/scipy.svg",
            mega_link: "/quiztest/html_quiz",
            mega_name: "Learn SciPy"
          },
          {
            mega_icons: "assets/icons/right.svg",
            mega_link: "/categories/mobile_app_tutorials",
            mega_name: "Learn More"
          }
        ]
      },

      {
        heading: "❇️ Mobile App",
        megaLink: [
          {
            mega_icons: "assets/icons/android/android.svg",
            mega_link: "/quiztest/html_quiz",
            mega_name: "Learn Android"
          },
          {
            mega_icons: "assets/icons/android/swift.svg",
            mega_link: "/quiztest/html_quiz",
            mega_name: "Learn Swift"
          },
          {
            mega_icons: "assets/icons/android/ios.svg",
            mega_link: "/quiztest/html_quiz",
            mega_name: "Learn iOS"
          },
          {
            mega_icons: "assets/icons/android/flutter.svg",
            mega_link: "/quiztest/html_quiz",
            mega_name: "Learn Flutter"
          },
          {
            mega_icons: "assets/icons/android/nativescript.svg",
            mega_link: "/quiztest/html_quiz",
            mega_name: "Learn NativeScript"
          },
          {
            mega_icons: "assets/icons/android/ionic.svg",
            mega_link: "/quiztest/html_quiz",
            mega_name: "Learn ionic"
          },
          {
            mega_icons: "assets/icons/right.svg",
            mega_link: "/categories/mobile_app_tutorials",
            mega_name: "Learn More"
          }
        ]
      },
      // {
      //   heading: "❇️  MS And Other Tools",
      //   megaLink: [
      //     {
      //       mega_icons: "assets/icons/tools/excel.svg",
      //       mega_link: "/quiztest/html_quiz",
      //       mega_name: "Learn Excel"
      //     },
      //     {
      //       mega_icons: "assets/icons/tools/word.svg",
      //       mega_link: "/quiztest/html_quiz",
      //       mega_name: "Learn Word"
      //     },
      //     {
      //       mega_icons: "assets/icons/tools/ppt.svg",
      //       mega_link: "/quiztest/html_quiz",
      //       mega_name: "Learn PPT"
      //     },
      //     {
      //       mega_icons: "assets/icons/tools/ms-outlook.svg",
      //       mega_link: "/quiztest/html_quiz",
      //       mega_name: "Learn Outlook"
      //     },
      //     {
      //       mega_icons: "assets/icons/tools/excel.svg",
      //       mega_link: "/quiztest/html_quiz",
      //       mega_name: "Google Excel"
      //     },
      //     {
      //       mega_icons: "assets/icons/tools/power-bi.svg",
      //       mega_link: "/quiztest/html_quiz",
      //       mega_name: "Learn Power BI"
      //     },
      //     {
      //       mega_icons: "assets/icons/right.svg",
      //       mega_link: "/quiztest/html_quiz",
      //       mega_name: "Learn More"
      //     }
      //   ]
      // },
    ]
  }
]


}



