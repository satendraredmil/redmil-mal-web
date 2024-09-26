import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SchangelanguageService {

  private isBrowser: boolean = false;


  private http = inject(HttpClient);
  private translations = new BehaviorSubject<any>({});
  private currentLanguage: string = 'en';
  private isActive = new BehaviorSubject<boolean>(false); // Tracks if the current language is active

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.loadLanguage();
  }

  loadTranslations(lang: string): void {
    const url = `/assets/i18n/${lang}.json`;
    this.http.get(url).subscribe(
      (translations) => {
        //console.log('Loaded translations:', translations);
        this.translations.next(translations);
        localStorage.setItem('language', lang);
      },
      (error) => console.error('Error loading translations:', error)
    );
  }

  getTranslation(key: string) {
    return this.translations.asObservable().pipe(
      map(translations => this.getNestedValue(translations,key) || key)
    );
  }

   // Helper method to retrieve nested values using dot notation
   private getNestedValue(obj: any, key: string) {
    return key.split('.').reduce((o, k) => (o ? o[k] : null), obj);
  }

  toggleLanguage(): void {
    this.currentLanguage = this.currentLanguage === 'en' ? 'hi' : 'en';
    this.isActive.next(this.currentLanguage === 'hi'); // Update isActive based on the current language
    this.loadTranslations(this.currentLanguage);
  }

  private loadLanguage(): void {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      this.currentLanguage = savedLanguage;
      this.isActive.next(this.currentLanguage === 'hi'); // Update isActive based on the saved language
    }
    this.loadTranslations(this.currentLanguage);
  }
  // Check if the current language is active
  isActiveLanguage(): boolean {
    return this.isActive.getValue();
  }

}