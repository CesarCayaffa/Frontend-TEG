import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkMode = new BehaviorSubject<boolean>(false);

  constructor() {
    const darkMode = localStorage.getItem('darkMode') === 'true';
    this.setDarkMode(darkMode);
  }

  setDarkMode(enable: boolean) {
    this.darkMode.next(enable);
    localStorage.setItem('darkMode', enable ? 'true' : 'false');
    if (enable) {
      document.body.setAttribute('color-theme', 'dark');
    } else {
      document.body.setAttribute('color-theme', 'light');
    }
  }

  isDarkMode() {
    return this.darkMode.asObservable();
  }
}