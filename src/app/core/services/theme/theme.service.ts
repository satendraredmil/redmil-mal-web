import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private darkThemeClass = 'dark-theme';
  private lightThemeClass = 'light-theme';
  private isActiveTheme = new BehaviorSubject<boolean>(false)

  constructor() {
    const theme = localStorage.getItem('theme');
    if (theme) {
      this.setTheme(theme);
    }else {
      this.setTheme('light'); // Default theme agar koi theme set nahi hai
    }
  }

  setTheme(theme: string): void {
    if (theme === 'dark') {
      document.body.classList.add(this.darkThemeClass);
      document.body.classList.remove(this.lightThemeClass);
      localStorage.setItem('theme', 'dark');
      this.isActiveTheme.next(true); // Dark theme active
    } else {
      document.body.classList.add(this.lightThemeClass);
      document.body.classList.remove(this.darkThemeClass);
      localStorage.setItem('theme', 'light');
      this.isActiveTheme.next(false); // Light theme active
    }
  }

  toggleTheme(): void {
    const currentTheme = localStorage.getItem('theme') === 'dark' ? 'light' : 'dark';
    this.setTheme(currentTheme);
  }

  get currentTheme(): string {
    return localStorage.getItem('theme') || 'light';
  }

  get isActiveTheme$(): Observable<boolean> {
    return this.isActiveTheme.asObservable();
  }
}